import type { APIUser } from 'discord-api-types/v10';

interface UserTagProps {
	readonly user: APIUser;
}

export function UserTag({ user }: UserTagProps) {
	if (user.discriminator === '0') {
		return (
			<>
				<p className="font-medium">{user.global_name}</p>
				<p className="w-auto truncate text-sm text-muted-foreground">@{user.username}</p>
			</>
		);
	}

	return (
		<>
			<p className="font-medium">{user.username}</p>
			<p className="w-auto truncate text-sm text-muted-foreground">{user.discriminator}</p>
		</>
	);
}
