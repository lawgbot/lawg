import Link from 'next/link';

export default function Footer() {
	return (
		<footer className="inline-flex w-full flex-col items-center gap-12 border-t bg-background">
			<div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
				<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
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
						href="https://github.com/yuikigai/yuikigai"
						target="_blank"
						rel="noreferrer"
						className="font-medium underline underline-offset-4"
					>
						GitHub
					</Link>
					.
				</p>
			</div>
		</footer>
	);
}
