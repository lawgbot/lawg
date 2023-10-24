'use client';

import Link from 'next/link';
import type { PropsWithChildren } from 'react';
import { siteConfig } from '~/config/site';
import { useNav } from '~/contexts/nav';
import { useLockBody } from '~/hooks/use-lock-body';
import { cn } from '~/lib/util';
import type { MainNavItem } from '~/types';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent } from './ui/sheet';

interface MobileNavProps {
	readonly items: MainNavItem[];
}

export function MobileNav({ children, items }: PropsWithChildren<MobileNavProps>) {
	useLockBody();

	const { opened, setOpened } = useNav();

	return (
		<Sheet open={opened} onOpenChange={setOpened}>
			<SheetContent side="left" className="pr-0">
				<Link
					href="/"
					onClick={() => setOpened(false)}
					className="flex min-w-max shrink place-items-center place-content-center"
				>
					<h2 className="text-xl font-bold uppercase">{siteConfig.name}</h2>
				</Link>

				<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
					<nav className="grid grid-flow-row auto-rows-max text-sm">
						{items.map((item, idx) => (
							<Link
								key={idx}
								href={item.disabled ? '#' : item.href}
								className={cn(
									'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
									item.disabled && 'cursor-not-allowed opacity-60',
								)}
							>
								{item.title}
							</Link>
						))}
					</nav>

					{children}
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}
