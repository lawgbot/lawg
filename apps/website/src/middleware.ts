import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { DISCORD_OAUTH2_URL } from './lib/session';
import { DISCORD_OAUTH_COOKIES_KEY } from './util/constants';

export default async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.includes('dashboard')) {
		try {
			const cookies = request.cookies;

			if (!cookies.get(DISCORD_OAUTH_COOKIES_KEY)) {
				return NextResponse.redirect(new URL(DISCORD_OAUTH2_URL));
			}
		} catch {}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/dashboard', '/dashboard/:path*'],
};
