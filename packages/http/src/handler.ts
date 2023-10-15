import process from 'node:process';
import fastifyRateLimit from '@fastify/rate-limit';
import type { FastifyInstance } from 'fastify';
import { fastify } from 'fastify';
import metricsPlugin from 'fastify-metrics';
import fastifyRawBody from 'fastify-raw-body';
import { register } from 'prom-client';
import { registerRoutes } from './routes/register.js';

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
		await this.router.register(fastifyRateLimit, { global: false });
		await this.router.register(fastifyRawBody as any, {
			fields: 'rawBody',
			global: true,
		});
		await this.router.register(metricsPlugin, {
			defaultMetrics: { enabled: false, register },
			endpoint: null,
		});
		await this.router.register(registerRoutes, { prefix: '/api' });

		this.router.setNotFoundHandler((_req, res) => {
			void res.status(404).send({
				success: false,
				error: {
					code: 'not_found',
					message: 'Route does not exist',
				},
			});
		});

		this.router.get('/', (_req, res) => {
			void res.redirect('https://github.com/yuikigai/yuikigai');
		});

		this.router.get('/metrics', async (req, res) => {
			if (req.headers.authorization?.replace('Bearer ', '') !== process.env.PROMETHEUS_AUTH)
				return res.status(401).send({
					success: false,
					error: {
						code: 'no_permission',
						message: 'You do not have permission to access this resource',
					},
				});

			const metrics = await register.metrics();
			void res.send(metrics);
		});

		await this.router.listen({ port: this.options.port ?? 4_001, host: '0.0.0.0' });
	}
}
