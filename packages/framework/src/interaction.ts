import { ApplicationCommandOptionType } from 'discord-api-types/v10';
import type {
	APIGuildMember,
	Permissions,
	APIPartialChannel,
	APIApplicationCommandInteractionDataOption,
	APIAttachment,
	APIInteractionDataResolved,
	APIInteractionDataResolvedChannel,
	APIInteractionDataResolvedGuildMember,
	APIRole,
	APIUser,
} from 'discord-api-types/v10';
import type { ArgumentsOf, CommandPayload } from '.';

export interface Option {
	attachment?: APIAttachment;
	channel?: APIInteractionDataResolvedChannel;
	member?: APIInteractionDataResolvedGuildMember;
	name: string;
	role?: APIRole;
	type: number;
	user?: APIUser;
	value?: boolean | number | string;
}

export type TransformResult = Option & {
	options?: Option[];
};

export function transformCommandOption(
	option: APIApplicationCommandInteractionDataOption,
	resolved: APIInteractionDataResolved,
) {
	const result: TransformResult = {
		name: option.name,
		type: option.type,
	};

	switch (option.type) {
		case ApplicationCommandOptionType.Subcommand:
		case ApplicationCommandOptionType.SubcommandGroup: {
			if ('options' in option) {
				result.options = option.options?.map((opt) => transformCommandOption(opt, resolved));
			}

			break;
		}

		case ApplicationCommandOptionType.Boolean:
		case ApplicationCommandOptionType.Integer:
		case ApplicationCommandOptionType.Number:
		case ApplicationCommandOptionType.String: {
			if ('value' in option) {
				result.value = option.value;
			}

			break;
		}

		case ApplicationCommandOptionType.Attachment:
		case ApplicationCommandOptionType.Channel:
		case ApplicationCommandOptionType.Mentionable:
		case ApplicationCommandOptionType.Role:
		case ApplicationCommandOptionType.User: {
			if (resolved) {
				const attachment = resolved.attachments?.[option.value];
				if (attachment) {
					result.attachment = attachment;
				}

				const channel = resolved.channels?.[option.value];
				if (channel) {
					result.channel = channel;
				}

				const role = resolved.roles?.[option.value];
				if (role) {
					result.role = role;
				}

				const user = resolved.users?.[option.value];
				if (user) {
					result.user = user;
				}

				const member = resolved.members?.[option.value];
				if (member) {
					result.member = member;
				}
			}
		}
	}

	return result;
}

export function transformApplicationInteraction<T extends CommandPayload = CommandPayload>(
	options: readonly APIApplicationCommandInteractionDataOption[],
): ArgumentsOf<T> {
	const opts: Record<
		string,
		| APIAttachment
		| APIRole
		| ArgumentsOf<T>
		| boolean
		| number
		| string
		| {
				member?: (APIGuildMember & { permissions: Permissions }) | undefined;
				user?: APIUser | undefined;
		  }
		| (APIPartialChannel & { permissions: Permissions })
		| undefined
	> = {};

	for (const top of options) {
		switch (top.type) {
			case ApplicationCommandOptionType.Subcommand:
			case ApplicationCommandOptionType.SubcommandGroup: {
				if ('options' in top) {
					opts[top.name] = transformApplicationInteraction<T>(top.options ? [...top.options] : []);
				}

				break;
			}

			case ApplicationCommandOptionType.Attachment:
			case ApplicationCommandOptionType.Channel:
			case ApplicationCommandOptionType.Mentionable:
			case ApplicationCommandOptionType.Role:
			case ApplicationCommandOptionType.Boolean:
			case ApplicationCommandOptionType.Integer:
			case ApplicationCommandOptionType.Number:
			case ApplicationCommandOptionType.User:
			case ApplicationCommandOptionType.String: {
				if ('value' in top) {
					opts[top.name] = top.value;
				}

				break;
			}

			default:
				break;
		}
	}

	return opts as ArgumentsOf<T>;
}
