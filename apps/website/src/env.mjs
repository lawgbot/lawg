import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		DISCORD_CLIENT_SECRET: z.string(),
		DISCORD_BOT_TOKEN: z.string(),
	},
	client: {
		NEXT_PUBLIC_LOCAL_DEV: z.boolean().default(false),
		NEXT_PUBLIC_DISCORD_CLIENT_ID: z.string(),
		NEXT_PUBLIC_DISCORD_CALLBACK_URL: z.string().default('http://localhost:3000/api/discord/callback'),
	},
	runtimeEnv: {
		NEXT_PUBLIC_LOCAL_DEV: Boolean(process.env.NEXT_PUBLIC_LOCAL_DEV),
		NEXT_PUBLIC_DISCORD_CLIENT_ID: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
		NEXT_PUBLIC_DISCORD_CALLBACK_URL: process.env.NEXT_PUBLIC_DISCORD_CALLBACK_URL,
		DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
		DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
	},
});
