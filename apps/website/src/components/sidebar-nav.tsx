'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { HTMLAttributes } from 'react';
import { cn } from '~/lib/util';
import type { SidebarNavItem } from '~/types';
import { Icon } from './icons';

interface SidebarNavProps extends HTMLAttributes<HTMLAnchorElement> {
	readonly items: SidebarNavItem[];
}

export function SidebarNav({ items, ...props }: SidebarNavProps) {
	const path = usePathname();

	return (
		<aside className="hidden flex-col border-r md:flex w-[200px]">
			<nav className="grid items-start gap-2" {...props}>
				{items.map((item, idx) => {
					return (
						item.href && (
							<Link key={idx} href={item.disabled ? '/' : item.href}>
								<span
									className={cn(
										'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
										path === item.href ? 'bg-accent' : 'transparent',
										item.disabled && 'cursor-not-allowed opacity-80',
									)}
								>
									<Icon name={item.icon ?? 'help-circle'} className="mr-2 h-4 w-4" />
									<span>{item.title}</span>
								</span>
							</Link>
						)
					);
				})}
			</nav>
		</aside>
	);
}
