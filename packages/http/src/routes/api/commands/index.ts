import process from 'node:process';
import { DISCORD_API_URL, DISCORD_USER_AGENT, container, kRedis, logger } from '@yuikigai/framework';
import type { APIApplicationCommand } from 'discord-api-types/v10';
import type { FastifyInstance } from 'fastify';
import type { Redis } from 'ioredis';
import { rateLimitConfig } from '../../../util/ratelimiter';

const CACHE_KEY = 'commands:list';
const CACHE_TIME = 60 * 60 * 24 * 7;

export async function CommandsRoute(router: FastifyInstance) {
	router.get('/commands', { config: { rateLimit: rateLimitConfig } }, async (_request, _reply): Promise<any> => {
		try {
			const redis = container.resolve<Redis>(kRedis);

			const cached = await redis.get(CACHE_KEY);

			if (cached) {
				const parsedCache = JSON.parse(cached);

				return {
					success: true,
					cached: true,
					data: parsedCache,
				};
			}

			const response = await fetch(`${DISCORD_API_URL}/applications/${process.env.DISCORD_CLIENT_ID}/commands`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
					'User-Agent': DISCORD_USER_AGENT,
				},
			});

			if (response.status !== 200) {
				return {
					success: false,
					error: {
						message: 'Internal server error',
						code: 'internal_server_error',
					},
				};
			}

			const result = (await response.json()) as APIApplicationCommand[];

			const commands = result.map(({ id, type, name, description }) => ({ id, type, name, description }));

			await redis.psetex(CACHE_KEY, CACHE_TIME, JSON.stringify({ commands }));

			return {
				success: true,
				cached: false,
				data: commands,
			};
		} catch (error) {
			logger.error('Error listing commands', error);

			return {
				success: false,
				error: {
					message: 'Internal server error',
					code: 'internal_server_error',
				},
			};
		}
	});
}
