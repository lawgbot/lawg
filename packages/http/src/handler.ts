import { fastify } from 'fastify';
import fastifyRawBody from 'fastify-raw-body';
import { InteractionsRoute } from './routes/interactions.js';

export interface HttpHandlerOptions {
	/**
	 * The port to listen on.
	 */
	port?: number;
}

export class HttpHandler {
	public fastify = fastify();

	public constructor(public readonly options: HttpHandlerOptions) {}

	public get log() {
		return this.fastify.log;
	}

	public async listen() {
		await this.fastify.register(fastifyRawBody as any, {
			fields: 'rawBody',
			global: true,
		});

		await this.fastify.register(InteractionsRoute);

		await this.fastify.listen({ port: this.options.port ?? 3_000 });
	}
}
