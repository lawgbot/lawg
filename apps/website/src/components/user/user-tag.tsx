export interface UserTagProps {
	discriminator: string;
	globalName: string | null;
	username: string;
}

export function UserTag(user: UserTagProps) {
	if (user.discriminator === '0') {
		return (
			<>
				<p className="font-medium">{user.globalName}</p>
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
