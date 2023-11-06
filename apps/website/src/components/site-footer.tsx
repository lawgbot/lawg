import dynamic from 'next/dynamic';
import Link from 'next/link';
import { siteConfig } from '~/config/site';
import { cn } from '~/lib/util';

const ThemeSwitcher = dynamic(async () => import('./theme-switcher'));

export function SiteFooter({ className }: { readonly className?: string }) {
	return (
		<footer className={cn(className)}>
			<div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
				<div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
					<p className="text-center text-sm leading-loose md:text-left">
						Built by{' '}
						<Link
							className="font-medium underline underline-offset-4"
							href="https://github.com/nicolasribeiroo"
							target="_blank"
							rel="noreferrer"
						>
							Nicolas Ribeiro
						</Link>{' '}
						and{' '}
						<Link
							className="font-medium underline underline-offset-4"
							href="https://github.com/davipatricio"
							target="_blank"
							rel="noreferrer"
						>
							Davi Patricio
						</Link>
						. The source code is available on{' '}
						<Link
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
							className="font-medium underline underline-offset-4"
						>
							GitHub
						</Link>
						.
					</p>
				</div>
				<ThemeSwitcher />
			</div>
		</footer>
	);
}
