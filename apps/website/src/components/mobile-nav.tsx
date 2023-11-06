'use client';

import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { siteConfig } from '~/config/site';
import { useLockBody } from '~/hooks/use-lock-body';
import { cn } from '~/lib/util';
import { useNav } from '~/state/nav';
import type { MainNavItem } from '~/types';
import { ScrollArea } from './ui/scroll-area';

interface MobileNavProps {
	readonly items: MainNavItem[];
}

export function MobileNav({ children, items }: PropsWithChildren<MobileNavProps>) {
	useLockBody();

	// eslint-disable-next-line @typescript-eslint/unbound-method
	const { setOpened } = useNav();

	return (
		<div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-3 pb-12 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
			<div className="relative z-20 grid gap-6 rounded-md bg-popover/95 backdrop-blur supports-[backdrop-filter]:bg-popover/130 border p-4 text-popover-foreground shadow-md">
				<Link onClick={() => setOpened(false)} href="/">
					<span className="font-bold">{siteConfig.name}</span>
				</Link>

				<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
					<nav className="grid grid-flow-row auto-rows-max text-sm">
						{items.map((item, index) => (
							<Link
								key={index}
								href={item.disabled ? '#' : item.href}
								onClick={item.disabled ? (event) => event.preventDefault() : () => setOpened(false)}
								className={cn(
									'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
									item.disabled && 'cursor-not-allowed opacity-60',
								)}
							>
								{item.title}
							</Link>
						))}
					</nav>
				</ScrollArea>
				{children}
			</div>
		</div>
	);
}
