import { calculateUserDefaultAvatarIndex } from '@lawgbot/utils';
import type { AvatarProps } from '@radix-ui/react-avatar';
import type { APIUser } from 'discord-api-types/v10';
import { Avatar, AvatarImage } from '../ui/avatar';

interface UserAvatarProps extends AvatarProps {
	readonly user: APIUser;
}

function parseAvatarURL(user: APIUser) {
	if (!user.avatar) {
		const index =
			user.discriminator === '0' ? calculateUserDefaultAvatarIndex(user.id) : Number(user.discriminator!) % 5;

		return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
	}

	return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
	return (
		<Avatar {...props}>
			<AvatarImage src={parseAvatarURL(user)} alt={`${user.username}'s picture`} />
		</Avatar>
	);
}
