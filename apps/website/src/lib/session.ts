import type { APIUser } from 'discord-api-types/v10';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export function getCurrentToken() {
	const cookieStore = cookies();

	const token = cookieStore.get('yuikigai-auth-session');

	if (!token) {
		redirect(
			`https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID!}&redirect_uri=${process.env
				.DISCORD_CALLBACK_URL!}&response_type=code&scope=identify%20email%20guilds`,
		);
	}

	return token.value;
}

export async function getCurrentUser() {
	const token = getCurrentToken();

	const userData = await fetch('https://discord.com/api/v10/users/@me', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		next: { revalidate: 3_600 },
	});

	if (userData.status !== 200) {
		redirect('/api/discord/logout');
	}

	return (await userData.json()) as APIUser;
}
