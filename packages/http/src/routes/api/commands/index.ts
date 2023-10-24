import process from 'node:process';
import { DISCORD_USER_AGENT, container, kRedis, logger } from '@lawgbot/framework';
import { DISCORD_API_URL } from '@lawgbot/utils';
import type { APIApplicationCommand } from 'discord-api-types/v10';
import type { FastifyInstance } from 'fastify';
import type { Redis } from 'ioredis';
import { rateLimitConfig } from '../../../util/ratelimiter';
import { internalError } from '../../../util/response';

const CACHE_KEY = 'commands:list';
const CACHE_TIME = 60 * 60 * 24 * 7;

export async function CommandsRoute(router: FastifyInstance) {
	router.get('/commands', { config: { rateLimit: rateLimitConfig } }, async (_request, reply): Promise<void> => {
		try {
			const redis = container.resolve<Redis>(kRedis);

			const cached = await redis.get(CACHE_KEY);

			if (cached) {
				const parsedCache = JSON.parse(cached);

				void reply.status(200).send({
					success: true,
					cached: true,
					data: parsedCache,
				});
				return;
			}

			const response = await fetch(`${DISCORD_API_URL}/applications/${process.env.DISCORD_CLIENT_ID}/commands`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
					'User-Agent': DISCORD_USER_AGENT,
				},
			});

			if (response.status !== 200) {
				void internalError();
			}

			const result = (await response.json()) as APIApplicationCommand[];

			const commands = result.map(({ id, type, name, description }) => {
				return {
					id,
					type,
					name,
					description,
				};
			});

			await redis.psetex(CACHE_KEY, CACHE_TIME, JSON.stringify({ commands }));

			void reply.status(200).send({
				success: true,
				cached: false,
				data: commands,
			});
		} catch (error) {
			logger.error('Error listing commands', error);

			void internalError();
		}
	});
}
