import { createHash } from "node:crypto";

type RateLimitEntry = {
	count: number;
	resetAt: number;
};

type RateLimitResult = {
	allowed: boolean;
	remaining: number;
	retryAfterSeconds: number;
};

const requestBuckets = new Map<string, RateLimitEntry>();

export const CONTACT_RATE_LIMIT = {
	maxRequests: 5,
	windowMs: 15 * 60 * 1000,
} as const;

/**
 * Small, in-memory defense for a single server instance.
 *
 * Production deployments with multiple instances need a durable shared provider
 * (for example, a managed Redis-compatible rate limiter) for global guarantees.
 */
export function checkContactRateLimit(
	key: string,
	now = Date.now(),
	config = CONTACT_RATE_LIMIT
): RateLimitResult {
	const current = requestBuckets.get(key);

	if (!current || current.resetAt <= now) {
		requestBuckets.set(key, { count: 1, resetAt: now + config.windowMs });
		return {
			allowed: true,
			remaining: config.maxRequests - 1,
			retryAfterSeconds: Math.ceil(config.windowMs / 1000),
		};
	}

	if (current.count >= config.maxRequests) {
		return {
			allowed: false,
			remaining: 0,
			retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
		};
	}

	current.count += 1;
	return {
		allowed: true,
		remaining: config.maxRequests - current.count,
		retryAfterSeconds: Math.ceil((current.resetAt - now) / 1000),
	};
}

export function getContactRateLimitKey(headers: Headers) {
	const platformIp = headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();

	if (!platformIp) return "platform-ip-unavailable";

	return createHash("sha256").update(platformIp).digest("hex");
}

export function resetContactRateLimitForTests() {
	requestBuckets.clear();
}
