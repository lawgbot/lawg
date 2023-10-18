import type { FastifyInstance } from 'fastify';
import { CommandsRoute } from './commands';

export async function APIRoutes(router: FastifyInstance) {
	await router.register(CommandsRoute);
}
