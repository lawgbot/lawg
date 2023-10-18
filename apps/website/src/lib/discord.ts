import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface DiscordUser {
	avatar: string;
	banner: string | null;
	banner_color: string | null;
	discriminator: string;
	email: string | null;
	flags: number;
	id: string;
	locale: string;
	mfa_enabled: boolean;
	premium_type: number;
	public_flags: number;
	username: string;
	verified: boolean;
}

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

export async function getAuthenticatedUser(token: string) {
	const userData = await fetch('https://discord.com/api/v10/users/@me', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		next: { revalidate: 3_600 },
	});

	if (userData.status !== 200) {
		redirect('/api/discord/logout');
	}

	return (await userData.json()) as DiscordUser;
}
