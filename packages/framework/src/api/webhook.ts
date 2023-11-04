import type { REST } from '@discordjs/rest';
import type { Snowflake } from 'discord-api-types/globals';
import { Routes } from 'discord-api-types/v10';
import type { APIInteraction, APIInteractionResponseCallbackData } from 'discord-api-types/v10';

export class WebhooksAPI {
	public constructor(
		private readonly rest: REST,
		private readonly interaction: APIInteraction,
	) {}

	/**
	 * Edits an associated message from a webhook
	 */
	public async editMessage(messageId: Snowflake, body: APIInteractionResponseCallbackData) {
		return this.rest.patch(Routes.webhookMessage(this.interaction.application_id, this.interaction.token, messageId), {
			body,
		});
	}
}
