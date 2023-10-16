import type { Context, ArgsParam } from '@yuikigai/framework';
import { Command } from '@yuikigai/framework';
import type { PingCommand } from '../../interactions/utility/ping.js';

export default class extends Command<typeof PingCommand> {
	public override async chatInput(context: Context, _args: ArgsParam<typeof PingCommand>): Promise<void> {
		await context.interactions.deferMessage(true);

		await context.interactions.editReply({
			content: 'OK',
		});
	}
}
