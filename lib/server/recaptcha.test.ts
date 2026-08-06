import { afterEach, describe, expect, it, vi } from "vitest";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha/actions";
import {
	evaluateAssessment,
	parseMinScore,
	getApprovedHostnames,
	readRecaptchaConfig,
	verifyRecaptchaToken,
	resetRecaptchaClientForTests,
} from "@/lib/server/recaptcha";
import { ContactRequestSchema } from "@/lib/validation/contact";
import { checkContactRateLimit, resetContactRateLimitForTests } from "@/lib/rate-limit";

afterEach(() => {
	resetRecaptchaClientForTests();
	resetContactRateLimitForTests();
	vi.restoreAllMocks();
});

const baseEnv = {
	GOOGLE_CLOUD_API_KEY: "test-api-key",
	GOOGLE_CLOUD_PROJECT_ID: "twinslanguageservices",
	NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "test-site-key",
	NODE_ENV: "test",
	RECAPTCHA_MIN_SCORE: "0.5",
} as NodeJS.ProcessEnv;

const validAssessment = {
	name: "projects/twinslanguageservices/assessments/abc",
	riskAnalysis: { reasons: ["AUTOMATION"], score: 0.9 },
	tokenProperties: {
		action: RECAPTCHA_ACTIONS.contactSubmit,
		hostname: "twins-languageservices.com",
		valid: true,
	},
};

describe("parseMinScore", () => {
	it("defaults to 0.5 when unset", () => {
		expect(parseMinScore()).toBe(0.5);
		expect(parseMinScore("")).toBe(0.5);
	});

	it("rejects malformed thresholds", () => {
		expect(parseMinScore("nope")).toBeNull();
		expect(parseMinScore("-0.1")).toBeNull();
		expect(parseMinScore("1.1")).toBeNull();
	});

	it("accepts a valid threshold", () => {
		expect(parseMinScore("0.5")).toBe(0.5);
		expect(parseMinScore("0")).toBe(0);
		expect(parseMinScore("1")).toBe(1);
	});
});

describe("getApprovedHostnames", () => {
	it("includes production hostnames", () => {
		const hostnames = getApprovedHostnames(baseEnv, "production");
		expect(hostnames).toContain("twins-languageservices.com");
		expect(hostnames).toContain("www.twins-languageservices.com");
		expect(hostnames).not.toContain("localhost");
	});

	it("includes localhost only outside production", () => {
		const hostnames = getApprovedHostnames(baseEnv, "development");
		expect(hostnames).toContain("localhost");
	});

	it("supports extra configured hostnames", () => {
		const hostnames = getApprovedHostnames(
			{ ...baseEnv, RECAPTCHA_ALLOWED_HOSTNAMES: "staging.example.com, preview.example.com" },
			"production"
		);
		expect(hostnames).toContain("staging.example.com");
		expect(hostnames).toContain("preview.example.com");
	});
});

describe("readRecaptchaConfig", () => {
	it("fails closed when production configuration is missing", () => {
		const result = readRecaptchaConfig({
			NODE_ENV: "production",
		});

		expect(result.ok).toBe(false);
		if (!result.ok) {
			expect(result.failureCode).toBe("CONFIGURATION_ERROR");
		}
	});

	it("fails when production auth is missing", () => {
		const result = readRecaptchaConfig({
			GOOGLE_CLOUD_PROJECT_ID: "twinslanguageservices",
			NEXT_PUBLIC_RECAPTCHA_SITE_KEY: "site-key",
			NODE_ENV: "production",
			RECAPTCHA_MIN_SCORE: "0.5",
		});

		expect(result.ok).toBe(false);
	});

	it("fails on malformed score threshold", () => {
		const result = readRecaptchaConfig({
			...baseEnv,
			RECAPTCHA_MIN_SCORE: "2",
		});

		expect(result.ok).toBe(false);
	});
});

describe("evaluateAssessment", () => {
	it("accepts a valid token at the threshold", () => {
		const result = evaluateAssessment({
			allowedHostnames: ["twins-languageservices.com"],
			assessment: {
				...validAssessment,
				riskAnalysis: { reasons: [], score: 0.5 },
			},
			expectedAction: RECAPTCHA_ACTIONS.contactSubmit,
			minScore: 0.5,
		});

		expect(result.success).toBe(true);
		expect(result.score).toBe(0.5);
	});

	it("rejects invalid tokens", () => {
		const result = evaluateAssessment({
			allowedHostnames: ["twins-languageservices.com"],
			assessment: {
				...validAssessment,
				tokenProperties: { ...validAssessment.tokenProperties, valid: false },
			},
			expectedAction: RECAPTCHA_ACTIONS.contactSubmit,
			minScore: 0.5,
		});

		expect(result.success).toBe(false);
		expect(result.failureCode).toBe("INVALID_TOKEN");
	});

	it("rejects action mismatches", () => {
		const result = evaluateAssessment({
			allowedHostnames: ["twins-languageservices.com"],
			assessment: {
				...validAssessment,
				tokenProperties: {
					...validAssessment.tokenProperties,
					action: "other_action",
				},
			},
			expectedAction: RECAPTCHA_ACTIONS.contactSubmit,
			minScore: 0.5,
		});

		expect(result.failureCode).toBe("ACTION_MISMATCH");
	});

	it("rejects hostname mismatches", () => {
		const result = evaluateAssessment({
			allowedHostnames: ["twins-languageservices.com"],
			assessment: {
				...validAssessment,
				tokenProperties: {
					...validAssessment.tokenProperties,
					hostname: "evil.example.com",
				},
			},
			expectedAction: RECAPTCHA_ACTIONS.contactSubmit,
			minScore: 0.5,
		});

		expect(result.failureCode).toBe("HOSTNAME_MISMATCH");
	});

	it("accepts approved www hostname", () => {
		const result = evaluateAssessment({
			allowedHostnames: ["twins-languageservices.com", "www.twins-languageservices.com"],
			assessment: {
				...validAssessment,
				tokenProperties: {
					...validAssessment.tokenProperties,
					hostname: "www.twins-languageservices.com",
				},
			},
			expectedAction: RECAPTCHA_ACTIONS.contactSubmit,
			minScore: 0.5,
		});

		expect(result.success).toBe(true);
	});

	it("rejects low scores", () => {
		const result = evaluateAssessment({
			allowedHostnames: ["twins-languageservices.com"],
			assessment: {
				...validAssessment,
				riskAnalysis: { reasons: ["AUTOMATION"], score: 0.2 },
			},
			expectedAction: RECAPTCHA_ACTIONS.contactSubmit,
			minScore: 0.5,
		});

		expect(result.failureCode).toBe("LOW_SCORE");
	});
});

describe("verifyRecaptchaToken", () => {
	it("rejects a missing token", async () => {
		const result = await verifyRecaptchaToken(
			{ expectedAction: RECAPTCHA_ACTIONS.contactSubmit, token: "" },
			{ env: baseEnv }
		);

		expect(result.failureCode).toBe("MISSING_TOKEN");
	});

	it("accepts a valid assessment from the mocked Google client", async () => {
		const createAssessment = vi.fn().mockResolvedValue(validAssessment);

		const result = await verifyRecaptchaToken(
			{
				expectedAction: RECAPTCHA_ACTIONS.contactSubmit,
				token: "fresh-token",
				userAgent: "vitest",
			},
			{ createAssessment, env: baseEnv }
		);

		expect(result.success).toBe(true);
		expect(createAssessment).toHaveBeenCalledWith(
			expect.objectContaining({
				expectedAction: RECAPTCHA_ACTIONS.contactSubmit,
				token: "fresh-token",
			})
		);
	});

	it("maps Google API exceptions to ASSESSMENT_ERROR", async () => {
		const createAssessment = vi.fn().mockRejectedValue(new Error("network"));

		const result = await verifyRecaptchaToken(
			{ expectedAction: RECAPTCHA_ACTIONS.contactSubmit, token: "fresh-token" },
			{ createAssessment, env: baseEnv }
		);

		expect(result.failureCode).toBe("ASSESSMENT_ERROR");
	});

	it("rejects low scores from Google", async () => {
		const createAssessment = vi.fn().mockResolvedValue({
			...validAssessment,
			riskAnalysis: { reasons: [], score: 0.1 },
		});

		const result = await verifyRecaptchaToken(
			{ expectedAction: RECAPTCHA_ACTIONS.contactSubmit, token: "fresh-token" },
			{ createAssessment, env: baseEnv }
		);

		expect(result.failureCode).toBe("LOW_SCORE");
	});
});

describe("contact form schema and rate limit", () => {
	it("rejects honeypot submissions", () => {
		const parsed = ContactRequestSchema.safeParse({
			agree: true,
			appointmentDate: "",
			email: "person@example.com",
			firstName: "Ada",
			honeypot: "bot-filled",
			lastName: "Lovelace",
			message: "I need interpretation help for an appointment.",
			organization: "",
			phone: "7175550100",
			preferredLanguage: "",
			recaptchaToken: "token",
			serviceNeeded: "Phone Interpreting",
		});

		expect(parsed.success).toBe(false);
	});

	it("returns 429 behavior when the rate limit is exceeded", () => {
		const key = "test-rate-limit-key";

		for (let index = 0; index < 5; index += 1) {
			expect(checkContactRateLimit(key).allowed).toBe(true);
		}

		expect(checkContactRateLimit(key).allowed).toBe(false);
	});
});
