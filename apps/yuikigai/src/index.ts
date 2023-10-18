import 'dotenv/config';
import 'reflect-metadata';

import { fileURLToPath, pathToFileURL } from 'node:url';
import type { Command } from '@yuikigai/framework';
import {
	commandInfo,
	container,
	createCommands,
	dynamicImport,
	kCommands,
	logger,
	createPrisma,
} from '@yuikigai/framework';
import { HttpHandler } from '@yuikigai/http';
import readdirp from 'readdirp';

await createPrisma();

createCommands();

const commandFiles = readdirp(fileURLToPath(new URL('commands', import.meta.url)), {
	fileFilter: '*.js',
	directoryFilter: '!subcommands',
});

const http = new HttpHandler({ port: Number(process.env.HTTP_PORT), logger: process.env.NODE_ENV === 'development' });

try {
	const commands = container.resolve<Map<string, Command>>(kCommands);

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

	await http.listen();
	logger.info(`Listening server on http://127.0.0.1:${process.env.HTTP_PORT}`);
} catch (error_) {
	const error = error_ as Error;
	console.log(error);
	logger.error(error, error.message);
}
