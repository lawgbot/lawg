import type { DashboardConfig } from '~/types';

export const dashboardConfig: DashboardConfig = {
	mainNav: [
		{
			title: 'Support',
			href: 'https://discord.com',
			disabled: true,
		},
	],
	sidebarNav: [
		{
			title: 'Your Guilds',
			href: '/dashboard',
			icon: 'settings',
		},
	],
};
