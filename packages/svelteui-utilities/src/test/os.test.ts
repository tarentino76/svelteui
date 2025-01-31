import { beforeEach, describe, expect, test } from 'vitest';
import * as jsdom from 'jsdom';

import { os } from '$lib';

describe('use-os', () => {
	beforeEach(() => {
		const document = new jsdom.JSDOM(
			"<!doctype html><html><head><meta charset='utf-8'></head><body></body></html>"
		);
		const window = document.window;
		global.document = window.document;
		global.window = window;
	});

	test('returns the respective OS of the current window with a certain platform', () => {
		Object.defineProperty(window.navigator, 'platform', {
			get: () => 'Macintosh',
			configurable: true
		});
		expect(os()).eq('macos');

		Object.defineProperty(window.navigator, 'platform', {
			get: () => 'iPhone'
		});
		expect(os()).eq('ios');

		Object.defineProperty(window.navigator, 'platform', {
			get: () => 'Win64'
		});
		expect(os()).eq('windows');
	});

	test('returns the respective OS of the current window with a certain userAgent', () => {
		Object.defineProperty(window.navigator, 'userAgent', {
			get: () => 'Macintosh',
			configurable: true
		});
		expect(os()).eq('macos');

		Object.defineProperty(window.navigator, 'userAgent', {
			get: () => '(linux)',
			configurable: true
		});
		expect(os()).eq('linux');

		Object.defineProperty(window.navigator, 'userAgent', {
			get: () => 'iPhone'
		});
		expect(os()).eq('ios');

		Object.defineProperty(window.navigator, 'userAgent', {
			get: () => 'android'
		});
		expect(os()).eq('android');

		Object.defineProperty(window.navigator, 'userAgent', {
			get: () => 'Win64'
		});
		expect(os()).eq('windows');
	});

	test('returns undetermined when there is no window', () => {
		global.window = undefined;
		expect(os()).eq('undetermined');
	});
});
