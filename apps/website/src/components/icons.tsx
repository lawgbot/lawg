import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { Suspense, lazy } from 'react';

interface IconProps extends Omit<LucideProps, 'ref'> {
	readonly name: keyof typeof dynamicIconImports;
}

export function Icon({ name, ...props }: IconProps) {
	const LucideIcon = lazy(dynamicIconImports[name]);

	return (
		<Suspense>
			<LucideIcon {...props} />
		</Suspense>
	);
}
