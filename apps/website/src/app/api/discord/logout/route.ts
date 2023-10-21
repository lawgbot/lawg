import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	cookies().delete('yuikigai-auth-session');

	return NextResponse.redirect(
		new URL('/', process.env.NODE_ENV === 'development' ? `https://${req.headers.get('host')}` : req.url),
	);
}
