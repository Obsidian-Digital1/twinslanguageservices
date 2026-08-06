/**
 * Stable reCAPTCHA Enterprise action names.
 * Shared between client execute() calls and server expected-action checks.
 * Action names may only contain letters, numbers, slashes, and underscores.
 */
export const RECAPTCHA_ACTIONS = {
	contactSubmit: "contact_submit",
} as const;

export type RecaptchaAction = (typeof RECAPTCHA_ACTIONS)[keyof typeof RECAPTCHA_ACTIONS];
