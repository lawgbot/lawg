import process from 'node:process';
import { Context, RESTClient, logger } from '@yuikigai/framework';
import { InteractionResponseType, type APIInteraction, InteractionType } from 'discord-api-types/v10';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { handleApplicationCommand, verifyRequest } from '../../util/command.js';

export type DiscordIncomingRequest = FastifyRequest<{
	Body: APIInteraction;
	Headers: {
		'x-signature-ed25519': string;
		'x-signature-timestamp': string;
	};
}>;

export async function InteractionsRoute(router: FastifyInstance) {
	router.post('/interactions', async (request: DiscordIncomingRequest, reply): Promise<any> => {
		try {
			if (!(await verifyRequest(request))) {
				return {
					success: false,
					error: {
						message: 'Invalid request signature',
						code: 'invalid_request_signature',
					},
				};
			}

			const body = request.body;

			const rest = new RESTClient({
				token: process.env.DISCORD_BOT_TOKEN!,
			});
			const context = new Context(rest, body, reply);

			switch (body.type) {
				case InteractionType.Ping: {
					return {
						type: InteractionResponseType.Pong,
					};
				}

				case InteractionType.ApplicationCommand: {
					await handleApplicationCommand(context);
					break;
				}

				case InteractionType.MessageComponent:
				case InteractionType.ApplicationCommandAutocomplete:
				case InteractionType.ModalSubmit:
					throw new Error('Not implemented yet');

				default:
					return {
						success: false,
						error: {
							message: 'Invalid interaction type',
							code: 'invalid_interaction_type',
						},
					};
			}
		} catch (error) {
			logger.error('Error handling interaction', error);

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
