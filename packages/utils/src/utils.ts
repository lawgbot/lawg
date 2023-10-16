import type { Snowflake } from 'discord-api-types/globals';

/**
 * Calculates the default avatar index for a given user id.
 */
export function calculateUserDefaultAvatarIndex(userId: Snowflake) {
	return Number(BigInt(userId) >> 22n) % 6;
}
