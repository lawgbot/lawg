import { Interaction } from '@lawgbot/structures';
import type { APIInteraction, APIInteractionResponseCallbackData, Snowflake } from 'discord-api-types/v10';
import { InteractionResponseType, MessageFlags } from 'discord-api-types/v10';
import type { FastifyReply } from 'fastify';
import type { WebhooksAPI } from './webhook.js';

export class InteractionsAPI extends Interaction {
	public constructor(
		public readonly interaction: APIInteraction,
		private readonly response: FastifyReply,
		private readonly webhooks: WebhooksAPI,
	) {
		super(interaction);
	}

	/**
	 * Replies to an interaction
	 */
	public async replyMessage(data: APIInteractionResponseCallbackData) {
		await this.response.status(200).send({
			type: InteractionResponseType.ChannelMessageWithSource,
			data,
		});
	}

	/**
	 * Defers the reply to an interaction
	 */
	public async deferMessage(ephemeral = false) {
		await this.response.status(200).send({
			type: InteractionResponseType.DeferredChannelMessageWithSource,
			data: {
				flags: ephemeral ? MessageFlags.Ephemeral : undefined,
			},
		});
	}

	/**
	 * Edits the initial reply to an interaction
	 */
	public async editReply(callbackData: APIInteractionResponseCallbackData, messageId: Snowflake = '@original') {
		await this.webhooks.editMessage(messageId, callbackData);
	}
}
