import { Dashboard } from '~/components/dashboard';
import { fetchGuild } from '~/lib/guild';

interface IGuildRouteParams {
	id: string;
}

export default async function Page({ params }: { params: IGuildRouteParams }) {
	const guild = await fetchGuild(params.id);

	return (
		<Dashboard.Shell>
			<Dashboard.Header heading={guild.name} />
		</Dashboard.Shell>
	);
}
