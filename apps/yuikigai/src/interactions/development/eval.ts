import { ApplicationCommandOptionType } from 'discord-api-types/v10';

export const DevCommand = {
	name: 'dev',
	description: 'Development commands',
	options: [
		{
			name: 'eval',
			description: 'Evaluate code',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'code',
					description: 'Code to evaluate',
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		},
	],
} as const;
