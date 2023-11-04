import 'dotenv/config';

import { createEnv } from '@t3-oss/env-core';
import { z } from 'zod';

export const env = createEnv({
	server: {
		// Database Connections
		DATABASE_URL: z.string().min(1).default('postgres://postgres:postgres@localhost:5432/postgres'),
		REDIS_URL: z.string().min(1).default('redis://localhost:6379'),

		// HTTP Server
		HTTP_PORT: z.string().min(1).default('3000'),
		PROMETHEUS_AUTH: z.string().min(1).default('my-prometheus-auth'),

		// Discord Credentials
		DISCORD_PUBLIC_KEY: z.string().min(1),
		DISCORD_BOT_TOKEN: z.string().min(1),
		DISCORD_CLIENT_ID: z.string().min(1),
		DISCORD_DEVGUILD_ID: z.string().min(1),
	},
	runtimeEnv: process.env,
});
