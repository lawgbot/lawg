import type { URL } from 'node:url';
import {
	ButtonStyle,
	type APIButtonComponent,
	type APIButtonComponentBase,
	type APIMessageComponentEmoji,
	ComponentType,
} from 'discord-api-types/v10';

interface ICreateButton {
	customId?: string | undefined;
	disabled?: boolean | undefined;
	emoji?: APIMessageComponentEmoji | undefined;
	label: string;
	style?: ButtonStyle | undefined;
	url?: URL | string | undefined;
}

export function createButton({ label, customId, disabled, emoji, style, url }: ICreateButton): APIButtonComponent {
	const button: APIButtonComponentBase<any> = {
		type: ComponentType.Button,
		label,
		style: style ?? ButtonStyle.Primary,
		disabled,
		emoji,
	};

	if (style === ButtonStyle.Link && url) {
		Object.assign(button, {
			url: typeof url === 'string' ? url : url.href,
			custom_id: undefined,
		});
	}

	Object.assign(button, {
		custom_id: customId,
	});

	return button as APIButtonComponent;
}
