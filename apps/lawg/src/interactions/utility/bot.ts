import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const BotCommand = {
	name: 'bot',
	description: 'Bot related commands',
	options: [
		{
			name: 'ping',
			description: 'Health check',
			type: ApplicationCommandOptionType.Subcommand,
		},
	],
} as const;
