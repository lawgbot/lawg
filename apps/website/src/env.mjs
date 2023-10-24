import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
	server: {
		DISCORD_CLIENT_SECRET: z.string().min(1),
		DISCORD_BOT_TOKEN: z.string().min(1),
	},
	client: {
		NEXT_PUBLIC_LOCAL_DEV: z.boolean(),
		NEXT_PUBLIC_DISCORD_CLIENT_ID: z.string().min(1),
		NEXT_PUBLIC_DISCORD_CALLBACK_URL: z.string().min(1),
	},
	runtimeEnv: {
		NEXT_PUBLIC_LOCAL_DEV: Boolean(process.env.NEXT_PUBLIC_LOCAL_DEV),
		NEXT_PUBLIC_DISCORD_CLIENT_ID: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
		NEXT_PUBLIC_DISCORD_CALLBACK_URL: process.env.NEXT_PUBLIC_DISCORD_CALLBACK_URL,
		DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,
		DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
	},
});
