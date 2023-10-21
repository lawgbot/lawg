import type { APIApplicationCommandOption } from 'discord-api-types/v10';

export interface Command {
	description: string;
	id: string;
	name: string;
	options: APIApplicationCommandOption[];
}
