import { channelMention } from '@discordjs/formatters';
import type { APIChannel } from 'discord-api-types/v10';
import { Structure } from '../Structure';
import { data as kData } from '../util/symbols.js';

/**
 * Represents a channel in a guild.
 */
export class Channel extends Structure<APIChannel> {
	public constructor(
		/**
		 * The raw data received from the API for the channel
		 */
		data: APIChannel,
	) {
		super({ ...data });
	}

	/**
	 * The channel's id
	 */
	public get id() {
		return this[kData].id!;
	}

	/**
	 * The channel's name
	 */
	public get name() {
		return this[kData].name;
	}

	/**
	 * The channel's type
	 */
	public get type() {
		return this[kData].type;
	}

	/**
	 * The channel's flags
	 */
	public get flags() {
		return this[kData].flags;
	}

	public override toString() {
		return channelMention(this.id);
	}
}
