import { inspect } from 'node:util';
import { codeBlock } from '@discordjs/formatters';
import type { ContextParam } from '@yuikigai/framework';

interface EvalArgs {
	code: string;
}

const clean = (text: string) => {
	if (typeof text === 'string') {
		text
			.slice(0, 1_970)
			.replaceAll('`', `\`${String.fromCodePoint(8_203)}`)
			.replaceAll('@', `@${String.fromCodePoint(8_203)}`);
	}

	return text;
};

export async function evalCommand(context: ContextParam, args: EvalArgs): Promise<void> {
	if (!context.permittedUsers.includes(context.user.id)) return;

	await context.interactions.deferMessage();

	try {
		// eslint-disable-next-line no-eval
		const evaluate = await eval(args.code);

		await context.interactions.editReply({
			content: codeBlock('js', clean(inspect(evaluate, { depth: 0 }).slice(0, 1_970))),
		});
	} catch (error_) {
		const error = error_ as Error;
		await context.interactions.editReply({ content: codeBlock('js', error.message.slice(0, 1_970)) });
	}
}
