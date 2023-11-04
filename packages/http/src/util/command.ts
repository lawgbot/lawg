import { kCommands, container, transformApplicationInteraction } from '@lawgbot/framework';
import type { Context, CommandMap } from '@lawgbot/framework';
import type { APIChatInputApplicationCommandInteractionData } from 'discord-api-types/v10';

export async function handleApplicationCommand(context: Context) {
	const commandData = context.context.data as APIChatInputApplicationCommandInteractionData;

	const command = container.resolve<CommandMap>(kCommands).get(commandData.name);

	const args = transformApplicationInteraction(commandData.options ?? []);

	command?.chatInput(context, args);
}
