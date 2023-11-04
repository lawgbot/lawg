import { Context } from '@lawgbot/framework';
import { InteractionResponseType, InteractionType } from 'discord-api-types/v10';
import type { AppInstance } from '~/handler.js';
import type { DiscordIncomingRequest } from '~/util/index.js';
import { handleApplicationCommand, rest, verifyRequest, error } from '~/util/index.js';

export default async function InteractionsRoute(app: AppInstance) {
	app.route({
		method: 'POST',
		url: '/interactions',
		handler: async (request: DiscordIncomingRequest, reply): Promise<any> => {
			if (!(await verifyRequest(request))) {
				return reply.status(403).send(error('invalid_request_signature', 'Invalid request signature'));
			}

			const body = request.body;

			const context = new Context(rest, body, reply);

			if (body.type === InteractionType.Ping) {
				return {
					type: InteractionResponseType.Pong,
				};
			}

			if (body.type === InteractionType.ApplicationCommand) {
				await handleApplicationCommand(context);
			}
		},
	});
}
