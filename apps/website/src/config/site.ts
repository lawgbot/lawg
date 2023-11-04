import { LAWG_GITHUB_URL } from '@lawgbot/utils';
import type { SiteConfig } from '~/types';

export const siteConfig: SiteConfig = {
	name: 'lawg',
	description: 'lawg bot website',
	url: 'http://localhost:3000',
	links: {
		github: LAWG_GITHUB_URL,
	},
};
