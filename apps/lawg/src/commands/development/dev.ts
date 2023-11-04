import type { ContextParam, ArgsParam } from '@lawgbot/framework';
import { Command } from '@lawgbot/framework';
import type { DevCommand } from '~/interactions/index.js';
import { evalCommand } from './subcommands/eval.js';

export default class extends Command<typeof DevCommand> {
	public override async chatInput(context: ContextParam, args: ArgsParam<typeof DevCommand>): Promise<void> {
		switch (Object.keys(args)[0]) {
			case 'eval': {
				await evalCommand(context, args.eval);
				break;
			}

			default:
				break;
		}
	}
}
