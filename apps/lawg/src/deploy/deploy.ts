import 'reflect-metadata';

import { logger } from '@lawgbot/framework';
import { RouteBases, Routes } from 'discord-api-types/v10';
import { env } from '~/util/env.js';

export async function deploy(data: unknown, dev = false) {
	const route = `${RouteBases.api}${
		dev
			? Routes.applicationGuildCommands(env.DISCORD_CLIENT_ID, env.DISCORD_DEVGUILD_ID)
			: Routes.applicationCommands(env.DISCORD_CLIENT_ID)
	}`;

	try {
		const res = await fetch(route, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
			},
			method: 'PUT',
			body: JSON.stringify(data),
		}).then(async (response) => response.json());

		logger.info(res as string);
	} catch (error_) {
		const error = error_ as Error;
		logger.error(error);
	}
}
