import type { RateLimitOptions } from '@fastify/rate-limit';

export const rateLimitConfig: RateLimitOptions = {
	max: 5,
	timeWindow: 5 * 1_000,
};
