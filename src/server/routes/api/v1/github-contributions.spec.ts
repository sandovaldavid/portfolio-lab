import { describe, it, expect, vi, beforeEach } from 'vitest';

const SAMPLE_HTML = `
	<div>2,048 contributions in the last year</div>
	<table>
		<td class="ContributionCalendar-day" data-date="2026-06-01" data-level="0"></td>
		<td class="ContributionCalendar-day" data-date="2026-06-02" data-level="1"></td>
		<td class="ContributionCalendar-day" data-date="2026-06-03" data-level="2"></td>
		<td class="ContributionCalendar-day" data-date="2026-06-04" data-level="3"></td>
		<td class="ContributionCalendar-day" data-date="2026-06-05" data-level="4"></td>
		<td class="ContributionCalendar-day" data-date="2026-06-06" data-level="0"></td>
		<td class="ContributionCalendar-day" data-date="2026-06-07" data-level="1"></td>
		<td class="ContributionCalendar-day" data-date="2026-06-08" data-level="2"></td>
	</table>
`;

async function loadHandler() {
	vi.resetModules();
	const mod = await import('./github-contributions');
	return mod.default;
}

describe('github-contributions route', () => {
	beforeEach(() => {
		vi.stubGlobal('fetch', vi.fn());
	});

	it('fetches and parses the contributions calendar (happy path)', async () => {
		vi.mocked(fetch).mockResolvedValue({
			ok: true,
			status: 200,
			text: () => Promise.resolve(SAMPLE_HTML),
		} as Response);

		const handler = await loadHandler();
		const result = (await handler({} as never)) as {
			total: number;
			weeks: { days: { date: string; level: number }[] }[];
		};

		expect(result.total).toBe(2048);
		expect(result.weeks).toHaveLength(2);
		expect(result.weeks[0].days).toHaveLength(7);
		expect(result.weeks[1].days).toHaveLength(1);
		expect(result.weeks[0].days[0]).toEqual({ date: '2026-06-01', level: 0 });
	});

	it('returns a controlled error (not a raw 500) when GitHub is unreachable', async () => {
		vi.mocked(fetch).mockResolvedValue({
			ok: false,
			status: 503,
			text: () => Promise.resolve(''),
		} as Response);

		const handler = await loadHandler();

		await expect(handler({} as never)).rejects.toMatchObject({
			statusCode: 503,
		});
	});

	it('serves cached data on the second call without re-fetching', async () => {
		const fetchMock = vi.mocked(fetch).mockResolvedValue({
			ok: true,
			status: 200,
			text: () => Promise.resolve(SAMPLE_HTML),
		} as Response);

		const handler = await loadHandler();
		await handler({} as never);
		await handler({} as never);

		expect(fetchMock).toHaveBeenCalledTimes(1);
	});
});
