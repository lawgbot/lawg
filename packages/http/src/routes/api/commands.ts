import process from 'node:process';
import { container, kRedis } from '@lawgbot/framework';
import { Routes, type APIApplicationCommand } from 'discord-api-types/v10';
import type { Redis } from 'ioredis';
import type { AppInstance } from '~/handler.js';
import { rest } from '~/util/discord';
import { ok } from '~/util/response';

const CACHE_KEY = 'commands:list';
const CACHE_TIME = 60 * 60 * 24 * 7;

export default async function CommandsRoute(app: AppInstance) {
	app.route({
		method: 'GET',
		url: '/commands',
		handler: async (_request, reply) => {
			const redis = container.resolve<Redis>(kRedis);

			const cached = await redis.get(CACHE_KEY);

			if (cached) {
				const parsedCache = JSON.parse(cached);

				return reply.status(200).send(ok({ commands: parsedCache.commands }));
			}

			const result = (await rest.get(
				Routes.applicationCommands(process.env.DISCORD_CLIENT_ID!),
			)) as APIApplicationCommand[];

			const commands = result.map(({ id, type, name, description, options }) => {
				return {
					id,
					type,
					name,
					description,
					options,
				};
			});

			await redis.psetex(CACHE_KEY, CACHE_TIME, JSON.stringify({ commands }));

			return reply.status(200).send(ok({ commands }));
		},
	});
}
