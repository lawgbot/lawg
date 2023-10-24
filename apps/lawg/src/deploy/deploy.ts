import 'reflect-metadata';
import 'dotenv/config';

import { logger } from '@lawgbot/framework';
import { DISCORD_API_URL } from '@lawgbot/utils';

export async function deploy(data: any, dev = false) {
	const midRoute = dev ? `/guilds/${process.env.DISCORD_DEVGUILD_ID!}` : '';
	const route = `${DISCORD_API_URL}/applications/${process.env.DISCORD_CLIENT_ID!}${midRoute}/commands`;

	try {
		const res = await fetch(route, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN!}`,
			},
			method: 'PUT',
			body: JSON.stringify(data),
		}).then(async (response) => response.json());
		logger.info(res as string);
	} catch (error) {
		logger.error(error as Error);
	}
}
