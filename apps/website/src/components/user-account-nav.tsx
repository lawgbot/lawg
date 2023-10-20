'use client';

import type { APIUser } from 'discord-api-types/v10';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { HTMLAttributes } from 'react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { UserAvatar } from './user-avatar';

interface UserAccountNavProps extends HTMLAttributes<HTMLDivElement> {
	readonly user: APIUser;
}

function UserTag(user: Pick<UserAccountNavProps['user'], 'discriminator' | 'username'>) {
	if (user.discriminator === '0') {
		return (
			<div className="flex items-center gap-1">
				<span className="text-sm text-muted-foreground">@</span>
				<p className="font-medium">{user.username}</p>
			</div>
		);
	}

	return (
		<>
			<p className="font-medium">{user.username}</p>
			<p className="w-[200px] truncate text-sm text-muted-foreground">{user.discriminator}</p>
		</>
	);
}

export function UserAccountNav({ user }: UserAccountNavProps) {
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar
					className="h-8 w-8"
					user={{ avatar: user.avatar, discriminator: user.discriminator, id: user.id, username: user.username }}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						<UserTag discriminator={user.discriminator} username={user.username} />
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href="/dashboard">Dashboard</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="cursor-pointer"
					onClick={(event) => {
						event.preventDefault();
						router.push('/api/discord/logout');
					}}
				>
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
