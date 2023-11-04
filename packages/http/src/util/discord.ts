import crypto from 'node:crypto';
import process from 'node:process';
import { REST } from '@discordjs/rest';
import type { APIInteraction } from 'discord-api-types/v10';
import { verify } from 'discord-verify/node';
import type { FastifyRequest } from 'fastify';

export type DiscordIncomingRequest = FastifyRequest<{
	Body: APIInteraction;
	Headers: {
		'x-signature-ed25519': string;
		'x-signature-timestamp': string;
	};
}>;

export async function verifyRequest(req: DiscordIncomingRequest) {
	const signature = req.headers['x-signature-ed25519'];
	const timestamp = req.headers['x-signature-timestamp'];
	const rawBody = JSON.stringify(req.body);

	return verify(rawBody, signature, timestamp, process.env.DISCORD_PUBLIC_KEY!, crypto.webcrypto.subtle);
}

export const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!);
