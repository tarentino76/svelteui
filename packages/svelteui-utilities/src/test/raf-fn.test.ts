import { describe, expect, test, vi } from 'vitest';

import { rafFn } from '$lib';

describe('raf-fn', () => {
	test("calls a function on every 'requestAnimationFrame'", () => {
		const callbackMock = vi.fn();
		rafFn(callbackMock);
		expect(callbackMock).toHaveBeenCalled();
	});

	test('does not call function if the window is not defined', () => {
		const callbackMock = vi.fn(() => {
			throw new Error();
		});
		rafFn(callbackMock);
		expect(callbackMock).toHaveBeenCalled();
	});

	test('pauses the loop on request animation frame calls', () => {
		const callbackMock = vi.fn();
		const { pause } = rafFn(callbackMock);
		expect(callbackMock).toHaveBeenCalled();

		pause();
		expect(callbackMock).toHaveBeenCalledTimes(1);
	});
});
