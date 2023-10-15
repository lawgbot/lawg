import { PingCommand } from '../interactions/utility/ping.js';
import { deploy } from './deploy.js';

void deploy(
	[PingCommand].map((interaction) => ({
		...interaction,
		description: `🛠️ ${interaction.description}`,
	})),
	true,
);
