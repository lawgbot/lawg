import { container } from 'tsyringe';
import type { Command, CommandPayload } from '../index.js';
import { kCommands } from './tokens.js';

export type CommandMap = Map<string, Command<CommandPayload>>;

export function createCommands() {
	const commands = new Map<string, Command<CommandPayload>>();

	container.register(kCommands, { useValue: commands });
}
