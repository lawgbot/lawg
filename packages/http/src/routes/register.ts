import type { FastifyInstance } from 'fastify';
import { APIRoutes, InteractionsRoute } from '.';

export async function registerRoutes(app: FastifyInstance) {
	await app.register(InteractionsRoute);

	await app.register(APIRoutes, { prefix: '/api' });
}
