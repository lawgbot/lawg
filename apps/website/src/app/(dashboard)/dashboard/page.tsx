import { Dashboard } from '~/components/dashboard';
import { Guild } from '~/components/guild';
import { fetchMutualGuilds } from '~/lib/guild';
import { getCurrentUser } from '~/lib/session';

export default async function Page() {
	const user = await getCurrentUser();
	const guilds = await fetchMutualGuilds();

	return (
		<Dashboard.Shell>
			<Dashboard.Header heading={`Hello, ${user.username}`} text="Select a server to get started." />
			<div>
				{guilds?.length ? (
					<div className="divide-y divide-border rounded-md border">
						{guilds.map((guild) => (
							<Guild.Item key={guild.id} guild={guild} />
						))}
					</div>
				) : null}
			</div>
		</Dashboard.Shell>
	);
}
