'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useNav } from '~/contexts/nav';
import { MainNav } from './main-nav';
import ThemeSwitcher from './theme-switcher';
import { Button } from './ui/button';

export default function Header() {
	const { setOpened } = useNav();

	return (
		<header className="supports-backdrop-blur:bg-background/60 backdrop-blur max-w-screen z-50 border-b sticky top-0 flex w-full flex-col place-items-center place-content-between bg-background/95 overflow-hidden">
			<div className="container flex items-center justify-between px-2 lg:justify-center lg:px-8">
				{/* Main Logo */}
				<Link
					href="/"
					className="flex h-10 w-10 min-w-max shrink place-items-center place-content-center lg:w-auto lg:pr-9"
				>
					<h2 className="text-xl font-bold uppercase">yuikigai</h2>
				</Link>

				<div className="flex shrink basis-0 flex-col lg:grow">
					{/* Main Nav, in large screens */}
					<div className="hidden items-center justify-start lg:inline-flex">
						<MainNav />

						<div className="inline-flex w-full items-center justify-end gap-2 py-4 pl-6">
							<div className="hidden items-center justify-end gap-2 lg:flex">
								<ThemeSwitcher />

								<hr className="h-10 w-px border-0 border-l bg-border" />

								<Link href="/dashboard">
									<Button variant="outline">Dashboard</Button>
								</Link>
							</div>
						</div>
					</div>

					{/* Main Nav, in small screens */}
					<div className="inline-flex w-full items-center justify-between gap-2 py-4 pl-6 lg:hidden">
						<div className="flex items-center justify-end gap-2 lg:hidden">
							<ThemeSwitcher />

							<hr className="h-10 w-px border-0 border-l bg-border" />
							<Button variant="ghost" onClick={() => setOpened((open) => !open)}>
								<Menu size={24} />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
