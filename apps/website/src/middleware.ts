import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.includes('dashboard')) {
		try {
			const cookies = request.cookies;

			if (!cookies.get('yuikigai-auth-session')) {
				return NextResponse.redirect(
					new URL(
						`https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID!}&redirect_uri=${process
							.env.DISCORD_CALLBACK_URL!}&response_type=code&scope=identify%20email%20guilds`,
					),
				);
			}
		} catch {}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard', '/dashboard/:path*'],
};
