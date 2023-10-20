import type { APIGuild } from 'discord-api-types/v10';
import Link from 'next/link';
import { cn } from '~/lib/util';
import { Button, buttonVariants } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import { GuildIcon } from './guild-icon';

export interface GuildItemProps {
	readonly guild: Pick<APIGuild, 'icon' | 'id' | 'name'>;
}

export function GuildItem({ guild }: GuildItemProps) {
	return (
		<div className="flex rounded-md items-center justify-between p-6">
			<div className="grid gap-1">
				<GuildIcon
					guild={{
						icon: guild.icon,
						id: guild.id,
						name: guild.name,
					}}
					className="h-12 w-12 rounded-full"
				/>
				<span className="font-medium">{guild.name}</span>
			</div>
			<div>
				<Link href={`/dashboard/guilds/${guild.id}`} className={cn(buttonVariants())}>
					Manage
				</Link>
			</div>
		</div>
	);
}

export function GuildItemSkeleton() {
	return (
		<div className="flex border p-6 rounded-md">
			<div className="flex flex-row gap-4 justify-between items-center">
				<div className="flex items-center gap-2">
					<Skeleton className="h-12 w-12 rounded-full" />
					<Skeleton className="w-8" />
				</div>

				<Button variant="default" disabled>
					Manage
				</Button>
			</div>
		</div>
	);
}
