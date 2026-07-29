import { createElement } from "react";
import { Resend } from "resend";
import { ContactNotificationEmail } from "@/emails/ContactNotificationEmail";
import { siteConfig } from "@/lib/config/site";
import { checkContactRateLimit, getContactRateLimitKey } from "@/lib/rate-limit";
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

	const apiKey = process.env.RESEND_API_KEY ?? process.env.RESEND_API;

	if (!apiKey) {
		console.error("Contact form delivery is not configured: missing RESEND_API_KEY.");
		return Response.json({ message: "Email delivery is not configured." }, { status: 503 });
	}

	const form = parsedBody.data;
	const fullName = `${form.firstName} ${form.lastName}`;
	const resend = new Resend(apiKey);

	try {
		const { error } = await resend.emails.send({
			from: "Twins Language Services <onboarding@resend.dev>",
			react: createElement(ContactNotificationEmail, form),
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
