import { describe, it, expect, vi } from 'vitest';
import handler from './diagnostics';

interface DiagnosticsEvent {
	node: { req: { method: string } };
	__query?: Record<string, string>;
}

function mockEvent(query: Record<string, string> = {}): DiagnosticsEvent {
	return {
		node: { req: { method: 'GET' } },
		__query: query,
	};
}

vi.mock('h3', async () => {
	const actual = await vi.importActual<Record<string, unknown>>('h3');
	return {
		...actual,
		getQuery: (event: DiagnosticsEvent) => event.__query ?? {},
	};
});

describe('diagnostics route', () => {
	it('returns a healthy report shape without delay by default', async () => {
		const start = Date.now();
		const result = (await handler(mockEvent() as never)) as Record<string, unknown>;
		const elapsed = Date.now() - start;

		expect(result['status']).toBe('healthy');
		expect(result['latencyEmulated']).toBe(false);
		expect(result['metrics']).toMatchObject({
			platform: expect.any(String),
			arch: expect.any(String),
			nodeVersion: expect.any(String),
		});
		expect(typeof result['timestamp']).toBe('string');
		expect(elapsed).toBeLessThan(1000);
	});

	it('emulates latency only when the delay/emulate3g query param is set', async () => {
		vi.useFakeTimers();
		try {
			const pending = handler(mockEvent({ delay: 'true' }) as never) as Promise<
				Record<string, unknown>
			>;
			await vi.advanceTimersByTimeAsync(1500);
			const result = await pending;

			expect(result['latencyEmulated']).toBe(true);
		} finally {
			vi.useRealTimers();
		}
	});
});
