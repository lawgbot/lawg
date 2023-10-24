import process from 'node:process';
import { Context, RESTManager, logger } from '@lawgbot/framework';
import { InteractionResponseType, InteractionType } from 'discord-api-types/v10';
import type { FastifyInstance } from 'fastify';
import type { DiscordIncomingRequest } from '../../util/command.js';
import { handleApplicationCommand, verifyRequest } from '../../util/command.js';
import { error, internalError } from '../../util/response.js';

export async function InteractionsRoute(router: FastifyInstance) {
	router.post('/interactions', async (request: DiscordIncomingRequest, reply): Promise<void> => {
		try {
			if (!(await verifyRequest(request))) {
				void error('Invalid request signature', 'invalid_request_signature');
			}

			const body = request.body;

			const rest = new RESTManager({
				token: process.env.DISCORD_BOT_TOKEN!,
			});
			const context = new Context(rest, body, reply);

			switch (body.type) {
				case InteractionType.Ping: {
					void reply.status(200).send({
						type: InteractionResponseType.Pong,
					});
					break;
				}

				case InteractionType.ApplicationCommand: {
					await handleApplicationCommand(context);
					break;
				}

				default:
					void error('Invalid interaction type', 'invalid_interaction_type');
			}
		} catch (error) {
			logger.error('Error handling interaction', error);

			void internalError();
		}
	});
}
