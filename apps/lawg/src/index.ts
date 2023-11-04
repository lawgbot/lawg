import 'dotenv/config';
import 'reflect-metadata';

import { fileURLToPath, pathToFileURL } from 'node:url';
import type { Command, CommandMap } from '@lawgbot/framework';
import {
	commandInfo,
	container,
	createCommands,
	dynamicImport,
	kCommands,
	logger,
	createPrisma,
	createRedis,
} from '@lawgbot/framework';
import { bootstrap } from '@lawgbot/http';
import readdirp from 'readdirp';
import { env } from './util/env.js';

await createPrisma();
await createRedis();

createCommands();

const commandFiles = readdirp(fileURLToPath(new URL('commands', import.meta.url)), {
	fileFilter: '*.js',
	directoryFilter: '!subcommands',
});

try {
	const commands = container.resolve<CommandMap>(kCommands);

	for await (const dir of commandFiles) {
		const cmdInfo = commandInfo(dir.path);

		if (!cmdInfo) {
			continue;
		}

		const dynamic = dynamicImport<new () => Command>(async () => import(pathToFileURL(dir.fullPath).href));
		const command = container.resolve<Command>((await dynamic()).default);

		if (command.name) {
			for (const name of command.name) {
				commands.set(name.toLowerCase(), command);
			}
		} else {
			commands.set(cmdInfo.name.toLowerCase(), command);
		}
	}

	await bootstrap();
	logger.info(`Listening server on http://127.0.0.1:${env.HTTP_PORT}`);
} catch (error_) {
	const error = error_ as Error;
	logger.error(error, error.message);
}
