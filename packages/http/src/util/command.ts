import crypto from 'node:crypto';
import process from 'node:process';
import { kCommands, container, transformApplicationInteraction } from '@lawgbot/framework';
import type { Context, Command } from '@lawgbot/framework';
import type { APIChatInputApplicationCommandInteractionData, APIInteraction } from 'discord-api-types/v10';
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

async function getCommand(commandName: string) {
	const command = container.resolve<Map<string, Command>>(kCommands).get(commandName);

	if (!command) {
		return null;
	}

	return command;
}

export async function handleApplicationCommand(context: Context) {
	const commandData = context.context.data as APIChatInputApplicationCommandInteractionData;

	const command = await getCommand(commandData.name);
	const args = transformApplicationInteraction(commandData.options ?? []);

	if (!command) {
		return context.interaction.replyMessage({
			content: 'Command not found',
			flags: 1 << 6,
		});
	}

	await command.chatInput(context, args);
}
