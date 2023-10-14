'use client';

import { ThemeProvider } from 'next-themes';
import type { PropsWithChildren } from 'react';
import { useSystemThemeFallback } from '~/hooks/useSystemThemeFallback';

export function Providers({ children }: PropsWithChildren) {
	useSystemThemeFallback();

	return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
