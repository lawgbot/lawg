import type { HTMLAttributes } from 'react';
import { cn } from '~/lib/util';

type DashboardShellProps = HTMLAttributes<HTMLDivElement>;

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
	return (
		<div className={cn('grid items-start gap-8', className)} {...props}>
			{children}
		</div>
	);
}
