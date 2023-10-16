import { User } from '@yuikigai/structures';
import type { APIInteraction } from 'discord-api-types/v10';
import type { FastifyReply } from 'fastify';
import { InteractionsAPI, WebhooksAPI } from './api/index.js';
import type { RESTClient } from './index.js';

export class Context {
	public readonly interactions: InteractionsAPI;

	public readonly webhooks: WebhooksAPI;

	public constructor(
		public rest: RESTClient,
		public context: APIInteraction,
		public response: FastifyReply,
	) {
		this.webhooks = new WebhooksAPI(rest, context);
		this.interactions = new InteractionsAPI(response, this.webhooks);
	}

	public get user() {
		return new User(this.context.member!.user);
	}
}
