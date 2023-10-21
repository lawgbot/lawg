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
import { User } from './user';

interface UserAccountNavProps extends HTMLAttributes<HTMLDivElement> {
	readonly user: APIUser;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
	const router = useRouter();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<User.Avatar
					className="h-8 w-8"
					user={{ avatar: user.avatar, discriminator: user.discriminator, id: user.id, username: user.username }}
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<div className="flex items-center justify-start gap-2 p-2">
					<div className="flex flex-col space-y-1 leading-none">
						<User.Tag globalName={user.global_name} discriminator={user.discriminator} username={user.username} />
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="cursor-pointer" asChild>
					<Link href="/dashboard">Guilds</Link>
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
