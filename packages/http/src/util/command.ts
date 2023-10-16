import { kCommands, container, transformApplicationInteraction } from '@yuikigai/framework';
import type { Context, Command } from '@yuikigai/framework';
import type { APIChatInputApplicationCommandInteractionData } from 'discord-api-types/v10';

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
		return context.interactions.replyMessage({
			content: 'Command not found',
			flags: 1 << 6,
		});
	}

	await command.chatInput(context, args);
}
