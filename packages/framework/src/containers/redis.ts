import process from 'node:process';
import { container } from 'tsyringe';
import { kRedis } from './tokens.js';

export async function createRedis() {
	const Redis = await import('ioredis');

	const redis = new Redis.default(process.env.REDIS_URL!, { maxRetriesPerRequest: null });
	container.register(kRedis, { useValue: redis });
}
