import type { AvatarProps } from '@radix-ui/react-avatar';
import type { APIGuild } from 'discord-api-types/v10';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface GuildIconProps extends AvatarProps {
	readonly guild: Pick<APIGuild, 'icon' | 'id' | 'name'>;
}

function parseGuildName(name: string) {
	const firstLetters = name.match(/\b\w/g);

	if (!firstLetters) {
		return name;
	}

	return firstLetters.join('');
}

function parseIconURL(guildId: string, icon: string) {
	return `https://cdn.discordapp.com/icons/${guildId}/${icon}.webp`;
}

export function GuildIcon({ guild, ...props }: GuildIconProps) {
	return (
		<Avatar {...props}>
			{guild.icon ? (
				<AvatarImage src={parseIconURL(guild.id!, guild.icon)} alt={`${guild.name}'s guild icon`} />
			) : (
				<AvatarFallback>
					<span className="sr-only">{guild.name}</span>
					{parseGuildName(guild.name)}
				</AvatarFallback>
			)}
		</Avatar>
	);
}
