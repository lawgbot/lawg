import type { ContextParam, ArgsParam } from '@yuikigai/framework';
import { Command } from '@yuikigai/framework';
import type { DevCommand } from '../../interactions/index.js';

export default class extends Command<typeof DevCommand> {
	public override async chatInput(context: ContextParam, args: ArgsParam<typeof DevCommand>): Promise<void> {
		switch (Object.keys(args)[0]) {
			case 'ping': {
				await context.interactions.deferMessage(true);

				await context.interactions.editReply({
					content: 'OK',
				});
				break;
			}

			default:
				break;
		}
	}
}
