import process from 'node:process';
import fastifyRateLimit from '@fastify/rate-limit';
import 'reflect-metadata';
import { createCommands, createRedis } from '@lawgbot/framework';
import type { FastifyInstance } from 'fastify';
import { fastify } from 'fastify';
import metricsPlugin from 'fastify-metrics';
import fastifyRawBody from 'fastify-raw-body';
import { register } from 'prom-client';
import { registerRoutes } from './routes/register';
import { noPermission, notFound } from './util/response';

export interface HttpHandlerOptions {
	/**
	 * Whether to enable the logger.
	 *
	 */
	logger?: boolean;
	/**
	 * The port to listen on.
	 */
	port?: number;
}

createCommands();

export class HttpHandler {
	public router: FastifyInstance;

	public constructor(public readonly options: HttpHandlerOptions) {
		this.router = fastify({
			logger: options.logger ?? false,
			trustProxy: 1,
		});
	}

	public get log() {
		return this.router.log;
	}

	public async listen() {
		await createRedis();
		await this.router.register(fastifyRateLimit, { global: false });
		await this.router.register(fastifyRawBody as any, {
			fields: 'rawBody',
			global: true,
		});
		await this.router.register(metricsPlugin, {
			defaultMetrics: { enabled: false, register },
			endpoint: null,
		});
		await this.router.register(registerRoutes);

		this.router.setNotFoundHandler((_req, res) => {
			void res.status(404).send(notFound);
		});

		this.router.get('/', (_req, res) => {
			void res.redirect('https://github.com/lawgbot/lawg');
		});

		this.router.get('/metrics', async (req, res) => {
			if (req.headers.authorization?.replace('Bearer ', '') !== process.env.PROMETHEUS_AUTH)
				return res.status(401).send(noPermission);

			const metrics = await register.metrics();
			void res.send(metrics);
		});

		await this.router.listen({ port: this.options.port ?? 4_001, host: '0.0.0.0' });
	}
}
