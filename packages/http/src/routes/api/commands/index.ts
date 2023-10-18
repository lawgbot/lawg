import type { Command } from '@yuikigai/framework';
import { container, kCommands, logger } from '@yuikigai/framework';
import type { FastifyInstance } from 'fastify';

export async function CommandsRoute(router: FastifyInstance) {
	router.get('/commands', async (_request, reply): Promise<any> => {
		try {
			const commands = container.resolve<Map<string, Command>>(kCommands);

			if (!commands) {
				void reply.status(500).send({
					success: false,
					error: {
						message: 'No commands registered',
						code: 'no_commands',
					},
				});
			}

			void reply.status(200).send({
				success: true,
				data: Array.from(commands).map(([name]) => ({
					name,
				})),
			});
		} catch (error) {
			logger.error('Error listing commands', error);

			return {
				success: false,
				error: {
					message: 'Internal server error',
					code: 'internal_server_error',
				},
			};
		}
	});
}
