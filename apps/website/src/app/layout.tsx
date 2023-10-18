import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import Footer from '~/components/footer';
import Header from '~/components/header';
import { MobileNav } from '~/components/mobile-nav';
import { cn } from '~/lib/util';
import { DESCRIPTION } from '~/util/constants';
import { inter } from '~/util/fonts';
import { Providers } from './providers';

import '~/styles/main.css';

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.METADATA_BASE_URL ? process.env.METADATA_BASE_URL : `http://localhost:${process.env.PORT ?? 3_000}`,
	),
	title: 'yuikigai',
	description: DESCRIPTION,
	viewport: {
		minimumScale: 1,
		initialScale: 1,
		width: 'device-width',
	},
	icons: {
		other: [
			{
				url: '/favicon-32x32.png',
				sizes: '32x32',
				type: 'image/png',
			},
			{
				url: '/favicon-16x16.png',
				sizes: '16x16',
				type: 'image/png',
			},
		],
		apple: [
			'/apple-touch-icon.png',
			{
				url: '/safari-pinned-tab.svg',
				rel: 'mask-icon',
			},
		],
	},
	manifest: '/site.webmanifest',
	themeColor: [
		{ media: '(prefers-color-scheme: dark)', color: '#18181b' },
		{
			media: '(prefers-color-scheme: light)',
			color: '#ffffff',
		},
	],
	robots: 'index, follow',
	colorScheme: 'light dark',
	appleWebApp: {
		title: 'yuikigai',
	},
	applicationName: 'yuikigai',
	openGraph: {
		siteName: 'yuikigai',
		type: 'website',
		title: 'yuikigai',
		description: DESCRIPTION,
	},
	twitter: {
		card: 'summary_large_image',
		creator: '@mldyxniskii',
	},
	other: {
		'msapplication-TileColor': '#18181b',
	},
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html className={cn(inter.variable)} lang="en" suppressHydrationWarning>
			<head />
			<body className="scroll-smoth bg-background antialiased font-inter">
				<Providers>
					<Header />

					<main>
						<div className="max-w-none">{children}</div>
					</main>

					<Footer />
					<MobileNav />
				</Providers>
				<Analytics />
			</body>
		</html>
	);
}
