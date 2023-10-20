import type { APIGuild } from 'discord-api-types/v10';
import { redirect } from 'next/navigation';
import { getCurrentToken, getCurrentUser } from './session';

export async function fetchMutualGuilds() {
	const token = getCurrentToken();
	const user = await getCurrentUser();

	if (!user) {
		redirect('/api/discord/logout');
	}

	const userGuild = await fetch('https://discord.com/api/v10/users/@me/guilds', {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		next: { revalidate: 3_600 },
	});

	if (!userGuild.ok) {
		redirect('/api/discord/logout');
	}

	const botGuilds = await fetch('https://discord.com/api/v10/users/@me/guilds', {
		headers: {
			Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
		},
		next: { revalidate: 3_600 },
	});

	if (!botGuilds.ok) {
		throw new Error('Failed to fetch bot guilds');
	}

	const botGuildsJson = (await botGuilds.json()) as APIGuild[];
	const userGuildJson = (await userGuild.json()) as APIGuild[];

	const adminUserGuilds = userGuildJson.filter((guild) => (Number.parseInt(guild.permissions!, 10) & 0x8) === 0x8);
	const mutualGuilds = userGuildJson.filter((guild) => botGuildsJson.some((botGuild) => botGuild.id === guild.id));

	return mutualGuilds.filter((guild) => !adminUserGuilds.some((adminGuild) => adminGuild.id === guild.id));
}

export async function fetchGuild(guildId: string) {
	const token = getCurrentToken();

	const guild = await fetch(`https://discord.com/api/v10/guilds/${guildId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		next: { revalidate: 3_600 },
	});

	if (!guild.ok) {
		redirect('/api/discord/logout');
	}

	return (await guild.json()) as APIGuild;
}
