import type { PropsWithChildren } from 'react';
import { MainNav } from '~/components/main-nav';
import { Nav } from '~/components/nav';
import { SiteFooter } from '~/components/site-footer';
import { rootConfig } from '~/config/root';

export default async function CommandsLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex min-h-screen flex-col space-y-6">
			<header className="sticky top-0 z-40 border-b bg-background">
				<div className="container flex h-16 items-center justify-between py-4">
					<MainNav items={rootConfig.mainNav} />
				</div>
			</header>
			<div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
				<aside className="hidden w-[200px] flex-col md:flex">
					<nav className="grid items-start gap-2">
						<Nav items={[]} />
					</nav>
				</aside>
				<main className="flex w-full flex-1 flex-col overflow-hidden">
					<div className="grid items-start gap-8">
						<div className="flex items-center justify-between px-2">
							<div className="grid gap-1">
								<h1 className="font-heading text-3xl md:text-4xl">
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime autem est, optio ipsam repellendus
									laudantium asperiores placeat similique voluptate doloremque, eveniet sequi architecto necessitatibus
									vero quisquam explicabo animi veniam hic?
								</h1>
							</div>
						</div>

						{children}
					</div>
				</main>
			</div>
			<SiteFooter className="border-t" />
		</div>
	);
}
