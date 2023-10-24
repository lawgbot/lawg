import { BotCommand, DevCommand } from '../interactions/index.js';
import { deploy } from './deploy.js';

void deploy(
	[BotCommand, DevCommand].map((interaction) => ({
		...interaction,
		description: `🛠️ ${interaction.description}`,
	})),
	true,
);
