import crypto from 'node:crypto';
import process from 'node:process';
import { logger } from '@yuikigai/framework';
import type { APIInteraction } from 'discord-api-types/v10';
import { InteractionResponseType, InteractionType } from 'discord-api-types/v10';
import { verify } from 'discord-verify/node';
import type { FastifyInstance, FastifyRequest } from 'fastify';

type DiscordIncomingRequest = FastifyRequest<{
	Body: APIInteraction;
	Headers: {
		'x-signature-ed25519': string;
		'x-signature-timestamp': string;
	};
}>;

async function verifyRequest(req: DiscordIncomingRequest) {
	const signature = req.headers['x-signature-ed25519'];
	const timestamp = req.headers['x-signature-timestamp'];
	const rawBody = JSON.stringify(req.body);

	return verify(rawBody, signature, timestamp, process.env.DISCORD_PUBLIC_KEY!, crypto.webcrypto.subtle);
}

export async function InteractionsRoute(router: FastifyInstance) {
	router.post('/interactions', async (request: DiscordIncomingRequest, _reply): Promise<any> => {
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

			if (body.type === InteractionType.Ping) {
				return {
					type: InteractionResponseType.Pong,
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
