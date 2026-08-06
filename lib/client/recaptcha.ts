"use client";

import type { RecaptchaAction } from "@/lib/recaptcha/actions";

const SCRIPT_ID = "recaptcha-enterprise";
const SCRIPT_SELECTOR = `#${SCRIPT_ID}`;
const LOAD_TIMEOUT_MS = 15_000;

let scriptLoadPromise: Promise<void> | null = null;

const getSiteKey = () => {
	const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();

	if (!siteKey) {
		throw new Error("reCAPTCHA is not configured.");
	}

	return siteKey;
};

const waitForEnterprise = () =>
	new Promise<void>((resolve, reject) => {
		const startedAt = Date.now();

		const poll = () => {
			if (window.grecaptcha?.enterprise) {
				resolve();
				return;
			}

			if (Date.now() - startedAt > LOAD_TIMEOUT_MS) {
				reject(new Error("reCAPTCHA failed to load."));
				return;
			}

			window.setTimeout(poll, 50);
		};

		poll();
	});

/**
 * @description Loads enterprise.js once and resolves when grecaptcha.enterprise is available.
 */
export const loadRecaptchaEnterprise = (): Promise<void> => {
	if (window.grecaptcha?.enterprise) {
		return Promise.resolve();
	}

	if (scriptLoadPromise) {
		return scriptLoadPromise;
	}

	scriptLoadPromise = new Promise<void>((resolve, reject) => {
		const existing = document.querySelector(SCRIPT_SELECTOR);

		if (existing) {
			void waitForEnterprise().then(resolve).catch(reject);
			return;
		}

		const siteKey = getSiteKey();
		const script = document.createElement("script");
		script.id = SCRIPT_ID;
		script.src = `https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`;
		script.async = true;
		script.defer = true;
		script.addEventListener("error", () => {
			scriptLoadPromise = null;
			reject(new Error("reCAPTCHA failed to load."));
		});
		script.addEventListener("load", () => {
			void waitForEnterprise().then(resolve).catch((error: unknown) => {
				scriptLoadPromise = null;
				reject(error instanceof Error ? error : new Error("reCAPTCHA failed to load."));
			});
		});
		document.head.append(script);
	});

	return scriptLoadPromise;
};

/**
 * @description Obtains a fresh Enterprise token immediately before a protected request.
 * Tokens must not be reused, cached, or generated on page load for later use.
 */
export const getRecaptchaToken = async (action: RecaptchaAction): Promise<string> => {
	const siteKey = getSiteKey();
	await loadRecaptchaEnterprise();

	const enterprise = window.grecaptcha?.enterprise;

	if (!enterprise) {
		throw new Error("reCAPTCHA is unavailable.");
	}

	return new Promise<string>((resolve, reject) => {
		enterprise.ready(() => {
			void enterprise
				.execute(siteKey, { action })
				.then((value) => {
					if (value.trim().length === 0) {
						reject(new Error("reCAPTCHA returned an empty token."));
						return;
					}

					resolve(value);
				})
				.catch((error: unknown) => {
					reject(error instanceof Error ? error : new Error("reCAPTCHA execution failed."));
				});
		});
	});
};

export const RECAPTCHA_USER_ERROR =
	"We could not verify your submission. Please refresh the page and try again.";
