import type { Context } from '../context.js';
import type { ArgumentsOf, CommandPayload } from './ArgumentsOf.js';

export interface ChatInput<C extends CommandPayload> {
	chatInput(context: Context, args: ArgumentsOf<C>): Promise<any> | any;
}

export type Commands<C extends CommandPayload> = ChatInput<C> & Record<string, any>;

export const enum CommandMethod {
	ChatInput = 'chatInput',
}

type CommandMethodParameters<C extends CommandPayload, T extends string = CommandMethod.ChatInput> = Parameters<
	Commands<C>[T]
>;

export type ContextParam<C extends CommandMethod = CommandMethod.ChatInput> = CommandMethodParameters<
	CommandPayload,
	C
>[0];

export type ArgsParam<
	C extends CommandPayload,
	M extends CommandMethod = CommandMethod.ChatInput,
> = C extends CommandPayload ? CommandMethodParameters<C, M>[1] : never;
