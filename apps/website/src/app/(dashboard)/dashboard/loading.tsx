import { DashboardHeader } from '~/components/dashboard-header';
import { DashboardShell } from '~/components/dashboard-shell';
import { Guild } from '~/components/guilds';

export default function DashboardLoading() {
	<DashboardShell>
		<DashboardHeader heading="Hello" text="Select a server to get started." />
		<div className="flex items-center justify-center w-screen h-screen">
			<Guild.Skeleton />
		</div>
	</DashboardShell>;
}
