import { InteractionsAPI } from './api/index.js';

export class Context {
	public readonly interactions: InteractionsAPI;

	public constructor(public applicationId: string) {
		this.interactions = new InteractionsAPI();
	}
}
