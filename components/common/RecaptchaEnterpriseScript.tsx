"use client";

import Script from "next/script";

/**
 * @description Loads Google Cloud reCAPTCHA Enterprise (Website • score) once per page.
 * Token generation still happens only at submit time via getRecaptchaToken().
 */
export function RecaptchaEnterpriseScript() {
	const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim();

	if (!siteKey) {
		return null;
	}

	return (
		<Script
			id="recaptcha-enterprise"
			src={`https://www.google.com/recaptcha/enterprise.js?render=${siteKey}`}
			strategy="afterInteractive"
		/>
	);
}
