import { basename, extname } from 'node:path';
import { logger } from './logger.js';
import type { ArgsParam, CommandInfo, CommandMethod, CommandPayload, Commands, ContextParam } from './index.js';

export abstract class Command<C extends CommandPayload = CommandPayload> implements Commands<C> {
	public constructor(public readonly name?: C['name'][]) {}

	public chatInput(
		_context: ContextParam<CommandMethod.ChatInput>,
		_args: ArgsParam<C, CommandMethod.ChatInput>,
	): Promise<any> | any {
		logger.info(
			`Received chat input interaction for command ${this.name}, but the command does not handle chat input interactions.`,
		);
	}
}

export function commandInfo(path: string): CommandInfo | null {
	if (extname(path) !== '.js') {
		return null;
	}

	return { name: basename(path, '.js') } as const;
}
