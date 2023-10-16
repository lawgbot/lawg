import { calculateUserDefaultAvatarIndex } from '@yuikigai/utils';
import type { APIUser, Snowflake } from 'discord-api-types/v10';
import { Structure } from '../Structure';
import { data as kData } from '../util/symbols.js';

/**
 * Represents any user on Discord.
 */
export class User extends Structure<APIUser> {
	public constructor(
		/**
		 * The raw data received from the API for the user
		 */
		data: APIUser,
	) {
		super({ ...data });
	}

	/**
	 * The user's id
	 */
	public get id(): Snowflake {
		return this[kData].id!;
	}

	/**
	 * The users's username
	 */
	public get username() {
		return this[kData].username;
	}

	/**
	 * The user's discriminator
	 */
	public get discriminator() {
		return this[kData].discriminator;
	}

	/**
	 * The user avatar's hash
	 */
	public get avatar() {
		return this[kData].avatar;
	}

	/**
	 * The user's avatar decoration hash
	 */
	public get avatarDecoration() {
		return this[kData].avatar_decoration;
	}

	/**
	 * The user's banner hash
	 */
	public get banner() {
		return this[kData].banner;
	}

	/**
	 * The user's display name, if it is set. For bots, this is the application name
	 */
	public get globalName() {
		return this[kData].global_name;
	}

	/**
	 * The user's chosen language option
	 */
	public get locale() {
		return this[kData].locale;
	}

	/**
	 * Whether the user has two factor enabled on their account
	 */
	public get mfaEnabled() {
		return this[kData].mfa_enabled;
	}

	/**
	 * Whether the user is a bot
	 */
	public get bot() {
		return this[kData].bot ?? false;
	}

	/**
	 * Whether the email on the user's account has been verified
	 */
	public get verified() {
		return this[kData].verified;
	}

	/**
	 * The user's email
	 */
	public get email() {
		return this[kData].email;
	}

	/**
	 * The type of nitro subscription on the user's account
	 */
	public get premiumType() {
		return this[kData].premium_type;
	}

	/**
	 * The flags for the user
	 */
	public get flags() {
		return this[kData].public_flags;
	}

	/**
	 * A link to the user's avatar.
	 */
	public avatarURL() {
		return this.avatar && `https://cdn.discordapp.com/avatars/${this.id}/${this.avatar}`;
	}

	/**
	 * A link to the user's default avatar.
	 */
	public get defaultAvatarURL() {
		const index =
			this.discriminator === '0' ? calculateUserDefaultAvatarIndex(this.id) : Number(this.discriminator!) % 5;

		return `https://cdn.discordapp.com/embed/avatars/${index}.png`;
	}

	/**
	 * A link to the user's avatar if they have one.
	 * Otherwise a link to their default avatar will be returned.
	 *
	 * @returns string
	 */
	public displayAvatarURL() {
		return this.avatarURL() ?? this.defaultAvatarURL;
	}
}
