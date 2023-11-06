'use client';

import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { useSystemThemeFallback } from '~/hooks/use-system-theme-fallback';

export function Providers({ children }: PropsWithChildren) {
	useSystemThemeFallback();

	return (
		<ThemeProvider enableSystem defaultTheme="system" attribute="class">
			{children}
		</ThemeProvider>
	);
}
