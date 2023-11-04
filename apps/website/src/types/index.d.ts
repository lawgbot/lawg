import type dynamicIconImports from 'lucide-react/dynamicIconImports';
import type { Route } from 'next';

export interface NavItem {
	disabled?: boolean;
	href: Route;
	title: string;
}

export type MainNavItem = NavItem;

export type SidebarNavItem = {
	disabled?: boolean;
	external?: boolean;
	icon?: keyof typeof dynamicIconImports;
	title: string;
} & (
	| {
			href: Route;
			items?: never;
	  }
	| {
			href?: Route;
			items: NavLink[];
	  }
);

export interface SiteConfig {
	description: string;
	links: {
		github: string;
	};
	name: string;
	url: string;
}

export interface RootConfig {
	mainNav: MainNavItem[];
}

export interface DashboardConfig {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
}
