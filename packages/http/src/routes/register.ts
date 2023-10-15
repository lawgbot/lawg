import type { FastifyInstance } from 'fastify';
import { DiscordRoutes } from './discord';

export async function registerRoutes(router: FastifyInstance) {
	/// /discord routes
	await router.register(DiscordRoutes);
}
