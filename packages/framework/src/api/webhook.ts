import type { Snowflake } from 'discord-api-types/globals';
import { Routes } from 'discord-api-types/v10';
import type { APIInteraction, APIInteractionResponseCallbackData } from 'discord-api-types/v10';
import type { RESTClient } from '..';

export class WebhooksAPI {
	public constructor(
		private readonly rest: RESTClient,
		private readonly interaction: APIInteraction,
	) {}

	/**
	 * Edits an associated message from a webhook
	 */
	public async editMessage(messageId: Snowflake, data: APIInteractionResponseCallbackData) {
		return this.rest.patch<APIInteractionResponseCallbackData>(
			Routes.webhookMessage(this.interaction.application_id, this.interaction.token, messageId),
			data,
			undefined,
		);
	}
}
