import type { FastifyInstance } from 'fastify';
import { InteractionsRoute } from './interactions.js';

export async function DiscordRoutes(router: FastifyInstance) {
	await router.register(InteractionsRoute, { prefix: '/discord' });
}
