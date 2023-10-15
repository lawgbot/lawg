import type {
	APIInteractionResponseCallbackData,
	APIInteractionResponseDeferredChannelMessageWithSource,
	Snowflake,
} from 'discord-api-types/v10';
import { InteractionResponseType, Routes } from 'discord-api-types/v10';

export class InteractionsAPI {
	/**
	 * Replies to an interaction
	 */
	public async reply(
		interactionId: Snowflake,
		interactionToken: string,
		{ ...data }: APIInteractionResponseCallbackData,
	) {
		await fetch(Routes.interactionCallback(interactionId, interactionToken), {
			method: 'POST',
			body: JSON.stringify({
				type: InteractionResponseType.ChannelMessageWithSource,
				data,
			}),
		});
	}

	/**
	 * Defers the reply to an interaction
	 */
	public async defer(
		interactionId: Snowflake,
		interactionToken: string,
		data?: APIInteractionResponseDeferredChannelMessageWithSource['data'],
	) {
		await fetch(Routes.interactionCallback(interactionId, interactionToken), {
			method: 'POST',
			body: JSON.stringify({
				type: InteractionResponseType.DeferredChannelMessageWithSource,
				data,
			}),
		});
	}

	/**
	 * Edits the initial reply to an interaction
	 */
	public async editReply(
		applicationId: Snowflake,
		interactionToken: string,
		callbackData: APIInteractionResponseCallbackData,
		messageId: Snowflake = '@original',
	) {
		await fetch(Routes.webhookMessage(applicationId, interactionToken, messageId), {
			method: 'PATCH',
			body: JSON.stringify(callbackData),
		});
	}
}
