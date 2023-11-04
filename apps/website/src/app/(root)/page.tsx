import type { Route } from 'next';
import Link from 'next/link';
import { buttonVariants } from '~/components/ui/button';
import { siteConfig } from '~/config/site';
import { cn } from '~/lib/util';

export default async function Page() {
	return (
		<section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
			<div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
				<h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">{siteConfig.name}</h1>
				<p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquid qui corporis magni expedita. Molestiae
					dolore laboriosam quod est doloribus quas nobis laborum enim officiis distinctio, fugiat, saepe sit ab earum?
				</p>
				<div className="space-x-4">
					<Link href="/dashboard" className={cn(buttonVariants({ size: 'lg' }))}>
						Get Started
					</Link>

					<Link
						href={siteConfig.links.github as Route}
						target="_blank"
						rel="noreferrer"
						className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
					>
						GitHub
					</Link>
				</div>
			</div>
		</section>
	);
}
