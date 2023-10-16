import { type APIChannel, type APIInteraction } from 'discord-api-types/v10';
import { Channel, Member, User } from '..';
import { Structure } from '../Structure';
import { data as kData } from '../util/symbols.js';

/**
 * Represents a interaction received from the API
 */
export class Interaction extends Structure<APIInteraction> {
	public constructor(
		/**
		 * The raw data received from the API for the interaction
		 */
		data: APIInteraction,
	) {
		super({ ...data });
	}

	/**
	 * The interaction's id
	 */
	public get id() {
		return this[kData].id!;
	}

	/**
	 * The application id of the interaction
	 */
	public get applicationId() {
		return this[kData].application_id;
	}

	/**
	 * The type of interaction
	 */
	public get type() {
		return this[kData].type;
	}

	/**
	 * The data of the interaction
	 */
	public get data() {
		return this[kData].data;
	}

	/**
	 * The guild id that the interaction was sent from
	 */
	public get guildId() {
		return this[kData].guild_id;
	}

	/**
	 * The partial channel that the interaction was sent from
	 */
	public get channel() {
		const _channel = this[kData].channel as APIChannel;
		return _channel ? new Channel(_channel) : null;
	}

	/**
	 * The channel id that the interaction was sent from
	 */
	public get channelId() {
		return this[kData].channel_id;
	}

	/**
	 * The guild member data for the invoking user, including permissions
	 */
	public get member() {
		const _member = this[kData].member;
		return _member ? new Member(_member) : null;
	}

	/**
	 * The user data for the invoking user, if invoked in a DM
	 */
	public get user() {
		const _user = this[kData].user;
		return _user ? new User(_user) : null;
	}

	/**
	 * The token of the interaction
	 */
	public get token() {
		return this[kData].token;
	}

	/**
	 * Read-only property, always 1
	 */
	public get version() {
		return this[kData].version;
	}

	/**
	 * For components, the message they were attached to
	 */
	public get message() {
		return this[kData].message;
	}

	/**
	 * 	Bitwise set of permissions the app or bot has within the channel the interaction was sent from
	 */
	public get appPermissions() {
		return this[kData].app_permissions;
	}

	/**
	 * 	Guild's preferred locale, if invoked in a guild
	 */
	public get guildLocale() {
		return this[kData].guild_locale;
	}
}
