import { Member, User, Channel } from '@yuikigai/structures';
import type { APIChannel, APIInteraction } from 'discord-api-types/v10';
import type { FastifyReply } from 'fastify';
import { InteractionsAPI, WebhooksAPI } from './api/index.js';
import type { RESTClient } from './index.js';

export class Context {
	public readonly interaction: InteractionsAPI;

	public readonly webhooks: WebhooksAPI;

	public readonly permittedUsers = ['847865068657836033'];

	public readonly user: User;

	public readonly member: Member;

	public readonly channel: Channel;

	public constructor(
		public rest: RESTClient,
		public context: APIInteraction,
		public response: FastifyReply,
	) {
		this.webhooks = new WebhooksAPI(rest, context);
		this.interaction = new InteractionsAPI(context, response, this.webhooks);

		this.user = new User(this.context.user ?? this.context.member!.user);
		this.member = new Member(this.context.member!);
		this.channel = new Channel(this.context.channel as APIChannel);
	}
}
