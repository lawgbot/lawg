import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function getAuthenticatedToken() {
	const cookieStore = cookies();

	const token = cookieStore.get('yuikigai-auth-session');

	if (!token) {
		redirect(
			`https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID!}&redirect_uri=${process.env
				.DISCORD_CALLBACK_URL!}&response_type=code&scope=identify%20email`,
		);
	}

	return token.value;
}
