import { afterEach, describe, expect, it, vi } from "vitest";

const verifyRecaptchaToken = vi.fn();
const logRecaptchaOutcome = vi.fn();
const send = vi.fn();

vi.mock("@/emails/ContactNotificationEmail", () => ({
	ContactNotificationEmail: () => null,
}));

vi.mock("@/lib/server/recaptcha", async () => {
	const actual = await vi.importActual<typeof import("@/lib/server/recaptcha")>(
		"@/lib/server/recaptcha"
	);

	return {
		...actual,
		logRecaptchaOutcome,
		verifyRecaptchaToken,
	};
});

vi.mock("resend", () => ({
	Resend: class {
		emails = { send };
	},
}));

vi.mock("@/lib/rate-limit", async () => {
	const actual = await vi.importActual<typeof import("@/lib/rate-limit")>("@/lib/rate-limit");

	return {
		...actual,
		checkContactRateLimit: vi.fn(() => ({
			allowed: true,
			remaining: 4,
			retryAfterSeconds: 900,
		})),
		getContactRateLimitKey: vi.fn(() => "test-key"),
	};
});

const validBody = {
	agree: true,
	appointmentDate: "",
	email: "person@example.com",
	firstName: "Ada",
	honeypot: "",
	lastName: "Lovelace",
	message: "I need interpretation help for an appointment.",
	organization: "",
	phone: "7175550100",
	preferredLanguage: "",
	recaptchaToken: "fresh-token",
	serviceNeeded: "Phone Interpreting",
};

afterEach(() => {
	vi.clearAllMocks();
	vi.unstubAllEnvs();
});

describe("POST /api/contact", () => {
	it("does not send email when reCAPTCHA fails", async () => {
		vi.stubEnv("RESEND_API_KEY", "re_test");
		verifyRecaptchaToken.mockResolvedValue({
			failureCode: "LOW_SCORE",
			reasons: [],
			score: 0.1,
			success: false,
		});

		const { POST } = await import("@/app/api/contact/route");
		const response = await POST(
			new Request("http://localhost/api/contact", {
				body: JSON.stringify(validBody),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			})
		);

		expect(response.status).toBe(403);
		expect(send).not.toHaveBeenCalled();
	});

	it("sends email only after reCAPTCHA passes", async () => {
		vi.stubEnv("RESEND_API_KEY", "re_test");
		verifyRecaptchaToken.mockResolvedValue({
			reasons: [],
			score: 0.9,
			success: true,
		});
		send.mockResolvedValue({ error: null });

		const { POST } = await import("@/app/api/contact/route");
		const response = await POST(
			new Request("http://localhost/api/contact", {
				body: JSON.stringify(validBody),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			})
		);

		expect(response.status).toBe(200);
		expect(send).toHaveBeenCalledOnce();
	});

	it("rejects missing tokens before processing", async () => {
		vi.stubEnv("RESEND_API_KEY", "re_test");

		const { POST } = await import("@/app/api/contact/route");
		const response = await POST(
			new Request("http://localhost/api/contact", {
				body: JSON.stringify({ ...validBody, recaptchaToken: "" }),
				headers: { "Content-Type": "application/json" },
				method: "POST",
			})
		);

		expect(response.status).toBe(400);
		expect(verifyRecaptchaToken).not.toHaveBeenCalled();
		expect(send).not.toHaveBeenCalled();
	});
});
