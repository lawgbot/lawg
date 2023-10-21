import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { env } from '~/env.mjs';

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const cookieStore = cookies();

	const params = new URLSearchParams({
		client_id: env.NEXT_PUBLIC_DISCORD_CLIENT_ID,
		client_secret: env.DISCORD_CLIENT_SECRET,
		grant_type: 'authorization_code',
		code: searchParams.get('code')!,
		redirect_uri: env.NEXT_PUBLIC_DISCORD_CALLBACK_URL,
	});

	const data = await fetch('https://discord.com/api/v10/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: params,
	});

	const json = await data.json();

	cookieStore.set('yuikigai-auth-session', json.access_token, {
		maxAge: json.expires_in,
		path: '/',
		httpOnly: true,
		secure: true,
	});

	return NextResponse.redirect(
		new URL('/dashboard', process.env.NODE_ENV === 'development' ? `https://${req.headers.get('host')}` : req.url),
	);
}
