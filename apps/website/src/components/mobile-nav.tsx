'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { PropsWithChildren } from 'react';
import { useNav } from '~/contexts/nav';
import { cn } from '~/lib/util';
import type { MainNavItem } from '~/types';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent } from './ui/sheet';

interface MobileNavProps {
	readonly items: MainNavItem[];
}

export function MobileNav({ children, items }: PropsWithChildren<MobileNavProps>) {
	const pathname = usePathname();
	const { opened, setOpened } = useNav();

	return (
		<Sheet open={opened} onOpenChange={setOpened}>
			<SheetContent side="left" className="pr-0">
				<Link
					href="/"
					onClick={() => setOpened(false)}
					className="flex min-w-max shrink place-items-center place-content-center"
				>
					<h2 className="text-xl font-bold uppercase">yuikigai</h2>
				</Link>

				<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
					<div className="flex flex-col space-y-3">
						<Link
							className={cn(
								'transition-colors hover:text-foreground/80',
								pathname?.startsWith('/dashboard') ? 'text-foreground' : 'text-foreground/60',
							)}
							onClick={() => setOpened(false)}
							href="/dashboard"
						>
							Dashboard
						</Link>
					</div>

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
