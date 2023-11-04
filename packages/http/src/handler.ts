import 'reflect-metadata';

import process from 'node:process';
import compress from '@fastify/compress';
import fastifyRateLimit from '@fastify/rate-limit';
import { createCommands, createRedis } from '@lawgbot/framework';
import { LAWG_GITHUB_URL } from '@lawgbot/utils';
import { fastify } from 'fastify';
import metricsPlugin from 'fastify-metrics';
import fastifyRawBody from 'fastify-raw-body';
import { register } from 'prom-client';
import { registerAutoload } from './lib/register-auto-load';
import { noPermission, notFound } from './util/response';

createCommands();

const app = fastify({ logger: process.env.NODE_ENV === 'development', trustProxy: 1 }).setNotFoundHandler(
	(_req, res) => {
		void res.status(404).send(notFound);
	},
);

export type AppInstance = typeof app;

export async function bootstrap() {
	await createRedis();

	await app.register(fastifyRateLimit, { global: false });
	await app.register(fastifyRawBody as any, {
		fields: 'rawBody',
		global: true,
	});
	await app.register(metricsPlugin, {
		defaultMetrics: { enabled: false, register },
		endpoint: null,
	});

	await Promise.all([registerAutoload(app, './routes'), app.register(compress)]);

	app.get('/', (_req, res) => {
		void res.redirect(LAWG_GITHUB_URL);
	});

	app.get('/metrics', async (req, res) => {
		if (req.headers.authorization?.replace('Bearer ', '') !== process.env.PROMETHEUS_AUTH)
			return res.status(401).send(noPermission);

		const metrics = await register.metrics();
		return res.send(metrics);
	});

	await app.listen({ port: Number(process.env.HTTP_PORT!), host: '0.0.0.0' });
}
