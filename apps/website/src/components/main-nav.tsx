'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useSelectedLayoutSegment } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { siteConfig } from '~/config/site';
import { cn } from '~/lib/util';
import { useNav } from '~/state/nav';
import type { MainNavItem } from '~/types';
import { MobileNav } from './mobile-nav';
import { Button } from './ui/button';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle,
} from './ui/navigation-menu';

interface MainNavProps {
	readonly items?: MainNavItem[];
}

export function MainNav({ children, items }: PropsWithChildren<MainNavProps>) {
	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { toggle, opened } = useNav();
	const segment = useSelectedLayoutSegment();

	return (
		<div className="flex gap-6 md:gap-10">
			<Link href="/" className="hidden items-center space-x-2 md:flex">
				<span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
			</Link>
			{items?.length ? (
				<NavigationMenu className="hidden gap-6 md:flex">
					<NavigationMenuList>
						{items?.map((item, idx) => (
							<NavigationMenuItem key={idx}>
								<Link
									legacyBehavior
									passHref
									href={item.disabled ? '#' : item.href}
									className={cn(
										'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
										item.href.startsWith(`/${segment}`) ? 'text-foreground' : 'text-foreground/60',
									)}
								>
									<NavigationMenuLink
										className={cn(navigationMenuTriggerStyle(), item.disabled && 'cursor-not-allowed opacity-80')}
									>
										{item.title}
									</NavigationMenuLink>
								</Link>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>
			) : null}
			<Button variant="ghost" className="flex items-center space-x-2 md:hidden" onClick={toggle}>
				<Menu />
			</Button>
			{opened && items && <MobileNav items={items}>{children}</MobileNav>}
		</div>
	);
}
