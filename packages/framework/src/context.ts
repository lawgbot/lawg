import { Member, User } from '@yuikigai/structures';
import type { APIInteraction } from 'discord-api-types/v10';
import type { FastifyReply } from 'fastify';
import { InteractionsAPI, WebhooksAPI } from './api/index.js';
import type { RESTClient } from './index.js';

export class Context {
	public readonly interactions: InteractionsAPI;

	public readonly webhooks: WebhooksAPI;

	public readonly permittedUsers = ['847865068657836033'];

	public readonly applicationId: string;

	public readonly channelId: string | undefined;

	public readonly guildId: string | undefined;

	public readonly user: User;

	public readonly member: Member;

	public constructor(
		public rest: RESTClient,
		public context: APIInteraction,
		public response: FastifyReply,
	) {
		this.webhooks = new WebhooksAPI(rest, context);
		this.interactions = new InteractionsAPI(response, this.webhooks);

		this.applicationId = this.context.application_id;
		this.channelId = this.context.channel?.id;
		this.guildId = this.context.guild_id;

		this.user = new User(this.context.user ?? this.context.member!.user);
		this.member = new Member(this.context.member!);
	}
}
