import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import { cn } from '~/lib/util';
import { DESCRIPTION } from '~/util/constants';
import { rubik } from '~/util/fonts';
import { Providers } from './providers';

import '~/styles/main.css';

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.METADATA_BASE_URL ? process.env.METADATA_BASE_URL : `http://localhost:${process.env.PORT ?? 3_000}`,
	),
	title: {
		default: 'yuikigai',
		template: '%s | yuikigai',
	},
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
	authors: [
		{
			name: 'niskii',
			url: 'https://niskii.dev',
		},
	],
	creator: 'niskii',
	themeColor: [
		{
			media: '(prefers-color-scheme: light)',
			color: 'light',
		},
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
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
		locale: 'en_US',
		description: DESCRIPTION,
	},
	twitter: {
		card: 'summary_large_image',
		creator: '@mldyxniskii',
		title: 'yuikigai',
		description: DESCRIPTION,
	},
	other: {
		'msapplication-TileColor': '#18181b',
	},
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html className={cn(rubik.variable)} lang="en" suppressHydrationWarning>
			<head />
			<body className="scroll-smooth bg-background antialiased font-rubik">
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	);
}
