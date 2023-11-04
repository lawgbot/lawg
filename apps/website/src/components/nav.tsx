'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';
import { cn } from '~/lib/util';
import type { SidebarNavItem } from '~/types';

interface NavProps extends HTMLAttributes<HTMLAnchorElement> {
	readonly items?: SidebarNavItem[];
}

export function Nav({ items, ...props }: NavProps) {
	const path = usePathname();

	if (!items?.length) {
		return null;
	}

	return (
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
								<span>{item.title}</span>
							</span>
						</Link>
					)
				);
			})}
		</nav>
	);
}
