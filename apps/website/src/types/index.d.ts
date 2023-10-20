export interface NavItem {
	disabled?: boolean;
	href: string;
	title: string;
}

export type MainNavItem = NavItem;

export type SidebarNavItem = {
	disabled?: boolean;
	external?: boolean;
	title: string;
} & (
	| {
			href: string;
			items?: never;
	  }
	| {
			href?: string;
			items: NavLink[];
	  }
);

export interface RootConfig {
	mainNav: MainNavItem[];
}

export interface DashboardConfig {
	mainNav: MainNavItem[];
	sidebarNav: SidebarNavItem[];
}
