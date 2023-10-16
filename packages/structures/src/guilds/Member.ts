import type { APIGuildMember } from 'discord-api-types/v10';
import { User } from '..';
import { Structure } from '../Structure';
import { data as kData } from '../util/symbols.js';

/**
 * Represents a member of a guild on Discord.
 */
export class Member extends Structure<APIGuildMember> {
	public constructor(
		/**
		 * The raw data received from the API for the member
		 */
		data: APIGuildMember,
	) {
		super({ ...data });
	}

	/**
	 * The user's id
	 */
	public get id() {
		return this[kData].user!.id;
	}

	/**
	 * This users guild nickname
	 */
	public get nickname() {
		return this[kData].nick;
	}

	/**
	 * The member's guild avatar hash
	 */
	public get avatar() {
		return this[kData].avatar;
	}

	/**
	 * Whether the member is deafened in voice channels
	 */
	public get communicationDisabledUntil() {
		return this[kData].communication_disabled_until;
	}

	/**
	 * Whether the member is deafened in voice channels
	 */
	public get deaf() {
		return this[kData].deaf;
	}

	/**
	 * Whether the member is muted in voice channels
	 */
	public get mute() {
		return this[kData].mute;
	}

	/**
	 * Whether the user has not yet passed the guild's Membership Screening requirements
	 */
	public get pending() {
		return this[kData].pending;
	}

	/**
	 * When the user joined the guild
	 */
	public get joinedAt() {
		return this[kData].joined_at;
	}

	/**
	 * When the user started boosting the guild
	 */
	public get premiumSince() {
		return this[kData].premium_since;
	}

	/**
	 * The members's partial user object
	 */
	public get user() {
		const user = this[kData].user;

		return user ? new User(user) : null;
	}
}
