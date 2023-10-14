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
	public get id(): Snowflake | undefined {
		return this[kData].id;
	}

	/**
	 * The user avatar's hash
	 */
	public get avatar() {
		return this[kData].avatar;
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
}
