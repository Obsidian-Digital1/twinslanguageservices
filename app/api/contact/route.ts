import { createElement } from "react";
import { Resend } from "resend";
import { ContactNotificationEmail } from "@/emails/ContactNotificationEmail";
import { siteConfig } from "@/lib/config/site";
import { checkContactRateLimit, getContactRateLimitKey } from "@/lib/rate-limit";
import { RECAPTCHA_ACTIONS } from "@/lib/recaptcha/actions";
import {
	getClientIpAddress,
	logRecaptchaOutcome,
	RECAPTCHA_PUBLIC_ERROR,
	verifyRecaptchaToken,
} from "@/lib/server/recaptcha";
import { ContactRequestSchema } from "@/lib/validation/contact";

export async function POST(request: Request) {
	const rateLimit = checkContactRateLimit(getContactRateLimitKey(request.headers));

	if (!rateLimit.allowed) {
		return Response.json(
			{ message: "Too many requests. Please wait before trying again." },
			{
				headers: { "Retry-After": String(rateLimit.retryAfterSeconds) },
				status: 429,
			}
		);
	}

	const parsedBody = ContactRequestSchema.safeParse(await request.json().catch(() => null));

	if (!parsedBody.success) {
		return Response.json({ message: "Please check the form and try again." }, { status: 400 });
	}

	const form = parsedBody.data;

	if (form.honeypot) {
		return Response.json({ message: "Please check the form and try again." }, { status: 400 });
	}

	const correlationId = crypto.randomUUID();
	const verification = await verifyRecaptchaToken({
		expectedAction: RECAPTCHA_ACTIONS.contactSubmit,
		token: form.recaptchaToken,
		userAgent: request.headers.get("user-agent"),
		userIpAddress: getClientIpAddress(request.headers),
	});

	logRecaptchaOutcome({
		action: RECAPTCHA_ACTIONS.contactSubmit,
		correlationId,
		result: verification,
	});

	if (!verification.success) {
		const status =
			verification.failureCode === "CONFIGURATION_ERROR" || verification.failureCode === "ASSESSMENT_ERROR" ?
				503
			:	403;

		return Response.json({ message: RECAPTCHA_PUBLIC_ERROR }, { status });
	}

	const apiKey = process.env.RESEND_API_KEY ?? process.env.RESEND_API;

	if (!apiKey) {
		console.error("Contact form delivery is not configured: missing RESEND_API_KEY.");
		return Response.json({ message: "Email delivery is not configured." }, { status: 503 });
	}

	const fullName = `${form.firstName} ${form.lastName}`;
	const resend = new Resend(apiKey);
	const emailFields = {
		agree: form.agree,
		appointmentDate: form.appointmentDate,
		email: form.email,
		firstName: form.firstName,
		honeypot: form.honeypot,
		lastName: form.lastName,
		message: form.message,
		organization: form.organization,
		phone: form.phone,
		preferredLanguage: form.preferredLanguage,
		serviceNeeded: form.serviceNeeded,
	};

	try {
		const { error } = await resend.emails.send({
			from: "Twins Language Services <onboarding@resend.dev>",
			react: createElement(ContactNotificationEmail, emailFields),
			replyTo: form.email,
			subject: `New ${form.serviceNeeded} request from ${fullName}`,
			to: [siteConfig.contact.email],
		});

		if (!error) {
			return Response.json({ message: "Message sent successfully." });
		}

		console.error("Contact form delivery provider returned an error.");
	} catch {
		console.error("Contact form delivery provider request failed.");
	}

	return Response.json(
		{ message: "We could not send your message. Please try again." },
		{ status: 502 }
	);
}
