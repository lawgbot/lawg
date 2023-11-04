import path from 'node:path';
import { URL } from 'node:url';
import fastifyAutoload from '@fastify/autoload';
import type { AppInstance } from '../handler.js';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

export async function registerAutoload(app: AppInstance, dir: string, options?: { encapsulate?: boolean }) {
	await app.register(fastifyAutoload, {
		dir: path.join(__dirname, dir),
		...options,
	});
}
