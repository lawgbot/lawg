import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { MainNav } from '~/components/main-nav';
import { SidebarNav } from '~/components/sidebar-nav';
import { SiteFooter } from '~/components/site-footer';
import { UserAccountNav } from '~/components/user-account-nav';
import { dashboardConfig } from '~/config/dashboard';
import { getCurrentUser } from '~/lib/session';

export const metadata: Metadata = {
	title: 'Dashboard',
	description: 'Manage your server with ease.',
};

export default async function DashboardLayout({ children }: PropsWithChildren) {
	const user = await getCurrentUser();

	return (
		<div className="flex min-h-screen flex-col space-y-6">
			<header className="sticky top-0 z-40 border-b bg-background">
				<div className="container flex h-16 items-center justify-between py-4">
					<MainNav items={dashboardConfig.mainNav} />
					<UserAccountNav user={{ ...user }} />
				</div>
			</header>
			<div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
				<aside className="hidden w-[200px] flex-col md:flex">
					<SidebarNav items={dashboardConfig.sidebarNav} />
				</aside>
				<main className="flex w-full flex-1 flex-col overflow-hidden">{children}</main>
			</div>
			<SiteFooter className="border-t" />
		</div>
	);
}
