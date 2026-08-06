import "server-only";

import { RecaptchaEnterpriseServiceClient, protos } from "@google-cloud/recaptcha-enterprise";
import type { RecaptchaAction } from "@/lib/recaptcha/actions";

export type RecaptchaFailureCode =
	| "ACTION_MISMATCH"
	| "ASSESSMENT_ERROR"
	| "CONFIGURATION_ERROR"
	| "HOSTNAME_MISMATCH"
	| "INVALID_TOKEN"
	| "LOW_SCORE"
	| "MISSING_TOKEN";

export type RecaptchaVerificationResult = {
	assessmentName?: string;
	failureCode?: RecaptchaFailureCode;
	reasons: string[];
	score: number | null;
	success: boolean;
};

export type RecaptchaVerifyInput = {
	expectedAction: RecaptchaAction;
	token: string | null | undefined;
	userAgent?: string | null;
	userIpAddress?: string | null;
};

export type AssessmentEvent = {
	expectedAction: string;
	siteKey: string;
	token: string;
	userAgent?: string;
	userIpAddress?: string;
};

export type AssessmentResponse = {
	name?: string | null;
	riskAnalysis?: {
		reasons?: Array<number | string | null> | null;
		score?: number | null;
	} | null;
	tokenProperties?: {
		action?: string | null;
		hostname?: string | null;
		invalidReason?: number | string | null;
		valid?: boolean | null;
	} | null;
};

export type CreateAssessmentFn = (event: AssessmentEvent) => Promise<AssessmentResponse>;

export const RECAPTCHA_PUBLIC_ERROR =
	"We could not verify your submission. Please refresh the page and try again.";

const DEFAULT_MIN_SCORE = 0.5;
const PRODUCTION_HOSTNAMES = ["twins-languageservices.com", "www.twins-languageservices.com"] as const;

type RecaptchaConfig = {
	allowedHostnames: string[];
	apiKey?: string;
	minScore: number;
	projectId: string;
	serviceAccount?: ServiceAccountCredentials;
	siteKey: string;
};

type ServiceAccountCredentials = {
	client_email: string;
	private_key: string;
	project_id?: string;
};

let cachedClient: RecaptchaEnterpriseServiceClient | null = null;

const isNonEmptyString = (value: unknown): value is string =>
	typeof value === "string" && value.trim().length > 0;

export const parseMinScore = (raw?: string): number | null => {
	if (raw === undefined || raw.trim() === "") {
		return DEFAULT_MIN_SCORE;
	}

	const parsed = Number(raw);

	if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1) {
		return null;
	}

	return parsed;
};

export const getApprovedHostnames = (
	env: NodeJS.ProcessEnv = process.env,
	nodeEnv = process.env.NODE_ENV
): string[] => {
	const configured = env.RECAPTCHA_ALLOWED_HOSTNAMES?.split(",")
		.map((hostname) => hostname.trim().toLowerCase())
		.filter(Boolean);

	const hostnames = new Set<string>([
		...PRODUCTION_HOSTNAMES,
		...(configured ?? []),
	]);

	if (nodeEnv !== "production") {
		hostnames.add("localhost");
		hostnames.add("127.0.0.1");
	}

	return [...hostnames];
};

const parseServiceAccountJson = (raw: string | undefined): ServiceAccountCredentials | undefined => {
	if (!isNonEmptyString(raw)) {
		return undefined;
	}

	try {
		const parsed: unknown = JSON.parse(raw);

		if (
			typeof parsed !== "object"
			|| parsed === null
			|| !("client_email" in parsed)
			|| !("private_key" in parsed)
			|| typeof parsed.client_email !== "string"
			|| typeof parsed.private_key !== "string"
		) {
			return undefined;
		}

		return {
			client_email: parsed.client_email,
			private_key: parsed.private_key.replaceAll(String.raw`\n`, "\n"),
			project_id:
				"project_id" in parsed && typeof parsed.project_id === "string" ?
					parsed.project_id
				:	undefined,
		};
	} catch {
		return undefined;
	}
};

export const readRecaptchaConfig = (
	env: NodeJS.ProcessEnv = process.env
): { config: RecaptchaConfig; ok: true; } | { failureCode: RecaptchaFailureCode; ok: false; } => {
	const projectId = env.GOOGLE_CLOUD_PROJECT_ID?.trim();
	const siteKey = env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();
	const minScore = parseMinScore(env.RECAPTCHA_MIN_SCORE);
	const apiKey =
		env.GOOGLE_CLOUD_API_KEY?.trim()
		|| env.GOOGLE_CLOUD_RECAPTCHA_API_KEY?.trim();
	const serviceAccount = parseServiceAccountJson(env.GOOGLE_SERVICE_ACCOUNT_KEY);

	if (!projectId || !siteKey || minScore === null) {
		return { failureCode: "CONFIGURATION_ERROR", ok: false };
	}

	const hasExplicitAuth =
		Boolean(apiKey)
		|| Boolean(serviceAccount)
		|| Boolean(env.GOOGLE_APPLICATION_CREDENTIALS?.trim());

	// Production must have an explicit server auth method. Never rely on ambient ADC alone
	// when deploying outside Google Cloud without configured credentials.
	if (env.NODE_ENV === "production" && !hasExplicitAuth) {
		return { failureCode: "CONFIGURATION_ERROR", ok: false };
	}

	return {
		config: {
			allowedHostnames: getApprovedHostnames(env),
			apiKey: apiKey && apiKey.length > 0 ? apiKey : undefined,
			minScore,
			projectId,
			serviceAccount,
			siteKey,
		},
		ok: true,
	};
};

export const isRecaptchaBypassEnabled = (env: NodeJS.ProcessEnv = process.env): boolean =>
	env.NODE_ENV !== "production" && env.RECAPTCHA_BYPASS_DEV === "true";

export const getClientIpAddress = (headers: Headers): string | undefined => {
	const platformIp = headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();

	if (platformIp && isLikelyIp(platformIp)) {
		return platformIp;
	}

	return undefined;
};

const isLikelyIp = (value: string) => {
	// Basic IPv4 / IPv6 shape check — do not invent or trust arbitrary headers.
	if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(value)) {
		return true;
	}

	return value.includes(":");
};

export const evaluateAssessment = (input: {
	allowedHostnames: string[];
	assessment: AssessmentResponse;
	expectedAction: RecaptchaAction;
	minScore: number;
}): RecaptchaVerificationResult => {
	const { allowedHostnames, assessment, expectedAction, minScore } = input;
	const tokenProperties = assessment.tokenProperties;
	const riskAnalysis = assessment.riskAnalysis;
	const reasons = (riskAnalysis?.reasons ?? [])
		.map((reason) => String(reason))
		.filter(Boolean);
	const score =
		typeof riskAnalysis?.score === "number" && Number.isFinite(riskAnalysis.score) ?
			riskAnalysis.score
		:	null;
	const assessmentName = assessment.name ?? undefined;

	if (!tokenProperties?.valid) {
		return {
			assessmentName,
			failureCode: "INVALID_TOKEN",
			reasons,
			score,
			success: false,
		};
	}

	if (tokenProperties.action !== expectedAction) {
		return {
			assessmentName,
			failureCode: "ACTION_MISMATCH",
			reasons,
			score,
			success: false,
		};
	}

	const hostname = tokenProperties.hostname?.trim().toLowerCase();

	if (!hostname || !allowedHostnames.includes(hostname)) {
		return {
			assessmentName,
			failureCode: "HOSTNAME_MISMATCH",
			reasons,
			score,
			success: false,
		};
	}

	if (score === null || score < minScore) {
		return {
			assessmentName,
			failureCode: "LOW_SCORE",
			reasons,
			score,
			success: false,
		};
	}

	return {
		assessmentName,
		reasons,
		score,
		success: true,
	};
};

const getEnterpriseClient = (serviceAccount?: ServiceAccountCredentials) => {
	if (cachedClient) {
		return cachedClient;
	}

	cachedClient = new RecaptchaEnterpriseServiceClient(
		serviceAccount ?
			{
				credentials: {
					client_email: serviceAccount.client_email,
					private_key: serviceAccount.private_key,
				},
				projectId: serviceAccount.project_id,
			}
		:	undefined
	);

	return cachedClient;
};

/** @description Clears the cached Enterprise client between unit tests. */
export const resetRecaptchaClientForTests = () => {
	cachedClient = null;
};

const createAssessmentWithClient = async (
	config: RecaptchaConfig,
	event: AssessmentEvent
): Promise<AssessmentResponse> => {
	const client = getEnterpriseClient(config.serviceAccount);
	const projectPath = client.projectPath(config.projectId);
	const request: protos.google.cloud.recaptchaenterprise.v1.ICreateAssessmentRequest = {
		assessment: {
			event: {
				expectedAction: event.expectedAction,
				siteKey: event.siteKey,
				token: event.token,
				userAgent: event.userAgent,
				userIpAddress: event.userIpAddress,
			},
		},
		parent: projectPath,
	};

	const [response] = await client.createAssessment(request);

	return {
		name: response.name,
		riskAnalysis: {
			reasons: response.riskAnalysis?.reasons?.map(String) ?? [],
			score: response.riskAnalysis?.score,
		},
		tokenProperties: {
			action: response.tokenProperties?.action,
			hostname: response.tokenProperties?.hostname,
			invalidReason: response.tokenProperties?.invalidReason,
			valid: response.tokenProperties?.valid,
		},
	};
};

const createAssessmentWithApiKey = async (
	config: RecaptchaConfig,
	event: AssessmentEvent
): Promise<AssessmentResponse> => {
	if (!config.apiKey) {
		throw new Error("Missing Google Cloud API key.");
	}

	const url = new URL(
		`https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(config.projectId)}/assessments`
	);
	url.searchParams.set("key", config.apiKey);

	const response = await fetch(url, {
		body: JSON.stringify({
			event: {
				expectedAction: event.expectedAction,
				siteKey: event.siteKey,
				token: event.token,
				userAgent: event.userAgent,
				userIpAddress: event.userIpAddress,
			},
		}),
		headers: { "Content-Type": "application/json" },
		method: "POST",
	});

	if (!response.ok) {
		throw new Error(`Assessment request failed with status ${response.status}`);
	}

	const payload = (await response.json()) as AssessmentResponse;
	return payload;
};

export const defaultCreateAssessment: CreateAssessmentFn = async (event) => {
	const configResult = readRecaptchaConfig();

	if (!configResult.ok) {
		throw new Error("reCAPTCHA configuration is incomplete.");
	}

	const { config } = configResult;

	// Prefer restricted API key on non-GCP hosts (e.g. Vercel). Use the official
	// client when service-account / ADC credentials are available.
	if (config.apiKey && !config.serviceAccount && !process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim()) {
		return createAssessmentWithApiKey(config, event);
	}

	if (config.serviceAccount || process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim()) {
		return createAssessmentWithClient(config, event);
	}

	if (config.apiKey) {
		return createAssessmentWithApiKey(config, event);
	}

	// Development ADC fallback
	return createAssessmentWithClient(config, event);
};

export const logRecaptchaOutcome = (input: {
	action: RecaptchaAction;
	correlationId?: string;
	result: RecaptchaVerificationResult;
}) => {
	const { action, correlationId, result } = input;

	console.info(
		JSON.stringify({
			action,
			assessmentName: result.assessmentName,
			correlationId,
			event: "recaptcha_assessment",
			failureCode: result.failureCode,
			reasons: result.reasons,
			score: result.score,
			success: result.success,
			timestamp: new Date().toISOString(),
		})
	);
};

export const verifyRecaptchaToken = async (
	input: RecaptchaVerifyInput,
	options?: {
		createAssessment?: CreateAssessmentFn;
		env?: NodeJS.ProcessEnv;
	}
): Promise<RecaptchaVerificationResult> => {
	const env = options?.env ?? process.env;

	if (isRecaptchaBypassEnabled(env)) {
		return {
			reasons: ["DEV_BYPASS"],
			score: 1,
			success: true,
		};
	}

	const token = input.token?.trim();

	if (!token) {
		return {
			failureCode: "MISSING_TOKEN",
			reasons: [],
			score: null,
			success: false,
		};
	}

	const configResult = readRecaptchaConfig(env);

	if (!configResult.ok) {
		return {
			failureCode: configResult.failureCode,
			reasons: [],
			score: null,
			success: false,
		};
	}

	const { config } = configResult;
	const createAssessment = options?.createAssessment ?? defaultCreateAssessment;

	try {
		const userAgent = input.userAgent?.trim();
		const userIpAddress = input.userIpAddress?.trim();
		const assessment = await createAssessment({
			expectedAction: input.expectedAction,
			siteKey: config.siteKey,
			token,
			userAgent: userAgent && userAgent.length > 0 ? userAgent : undefined,
			userIpAddress: userIpAddress && userIpAddress.length > 0 ? userIpAddress : undefined,
		});

		return evaluateAssessment({
			allowedHostnames: config.allowedHostnames,
			assessment,
			expectedAction: input.expectedAction,
			minScore: config.minScore,
		});
	} catch {
		return {
			failureCode: "ASSESSMENT_ERROR",
			reasons: [],
			score: null,
			success: false,
		};
	}
};
