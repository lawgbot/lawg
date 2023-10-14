import { URL } from 'node:url';
import { ButtonStyle } from 'discord-api-types/v10';
import { describe, test, expect } from 'vitest';
import { createButton } from '../src/index.js';

describe('Components', () => {
	describe('Button', () => {
		test('basic button', () => {
			expect(
				createButton({
					label: 'Button',
					customId: 'button',
					style: ButtonStyle.Primary,
				}),
			).toEqual({
				label: 'Button',
				style: 1,
				type: 2,
				emoji: undefined,
				disabled: undefined,
				custom_id: 'button',
			});
		});

		test('link button', () => {
			expect(
				createButton({
					label: 'Button',
					url: new URL('https://example.com'),
					style: ButtonStyle.Link,
				}),
			).toEqual({
				label: 'Button',
				url: 'https://example.com/',
				style: 5,
				type: 2,
				emoji: undefined,
				disabled: undefined,
				custom_id: undefined,
			});
		});
	});
});
