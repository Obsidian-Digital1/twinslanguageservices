export type GrecaptchaEnterprise = {
	execute: (siteKey: string, options: { action: string }) => Promise<string>;
	ready: (callback: () => void) => void;
};

export type Grecaptcha = {
	enterprise: GrecaptchaEnterprise;
};

declare global {
	// Window must remain an interface for declaration merging.
	// eslint-disable-next-line ts-eslint/consistent-type-definitions -- ambient Window merge
	interface Window {
		grecaptcha?: Grecaptcha;
	}
}
