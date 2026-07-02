import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { H3Event } from 'h3';
import { sep } from 'path';

vi.mock('fs', () => {
	const mocked = {
		writeFileSync: vi.fn(),
		mkdirSync: vi.fn(),
		existsSync: vi.fn(() => true),
	};
	return { ...mocked, default: mocked };
});

import { writeFileSync, existsSync } from 'fs';
import handler from './obsidian-sync';

interface MockEventOptions {
	method?: string;
	headers?: Record<string, string>;
	body?: unknown;
}

function createMockEvent(options: MockEventOptions = {}): H3Event {
	const method = options.method ?? 'POST';
	return {
		method,
		node: {
			req: {
				method,
				headers: options.headers ?? {},
			},
			res: { statusCode: 200 },
		},
		path: '/obsidian-sync',
		context: {},
		_requestBody: options.body,
	} as unknown as H3Event;
}

describe('obsidian-sync route', () => {
	const ORIGINAL_SECRET = process.env['OBSIDIAN_SYNC_SECRET'];

	beforeEach(() => {
		vi.clearAllMocks();
		vi.mocked(existsSync).mockReturnValue(true);
	});

	afterEach(() => {
		if (ORIGINAL_SECRET === undefined) {
			delete process.env['OBSIDIAN_SYNC_SECRET'];
		} else {
			process.env['OBSIDIAN_SYNC_SECRET'] = ORIGINAL_SECRET;
		}
	});

	it('rejects with 503 when OBSIDIAN_SYNC_SECRET is not configured', async () => {
		delete process.env['OBSIDIAN_SYNC_SECRET'];

		const event = createMockEvent({ headers: { 'x-obsidian-secret': 'anything' } });
		const result = await handler(event);

		expect(event.node.res.statusCode).toBe(503);
		expect(result).toEqual({ status: 'error', message: 'Sync disabled: secret not configured.' });
		expect(writeFileSync).not.toHaveBeenCalled();
	});

	it('rejects with 401 when the token does not match the configured secret', async () => {
		process.env['OBSIDIAN_SYNC_SECRET'] = 'correct-secret';

		const event = createMockEvent({ headers: { 'x-obsidian-secret': 'wrong-secret' } });
		const result = await handler(event);

		expect(event.node.res.statusCode).toBe(401);
		expect(result).toEqual({ status: 'error', message: 'Unauthorized. Invalid secret.' });
		expect(writeFileSync).not.toHaveBeenCalled();
	});

	it('rejects with 400 when slug is outside algorithms/ or systems/', async () => {
		process.env['OBSIDIAN_SYNC_SECRET'] = 'correct-secret';

		const event = createMockEvent({
			headers: { 'x-obsidian-secret': 'correct-secret' },
			body: { slug: 'notes/x', content: 'y' },
		});
		const result = await handler(event);

		expect(event.node.res.statusCode).toBe(400);
		expect(result).toEqual({
			status: 'error',
			message: 'Slug must start with algorithms/ or systems/.',
		});
		expect(writeFileSync).not.toHaveBeenCalled();
	});

	it('rejects with 400 on path traversal attempts', async () => {
		process.env['OBSIDIAN_SYNC_SECRET'] = 'correct-secret';

		const event = createMockEvent({
			headers: { 'x-obsidian-secret': 'correct-secret' },
			body: { slug: 'algorithms/../../etc/passwd', content: 'y' },
		});
		const result = await handler(event);

		expect(event.node.res.statusCode).toBe(400);
		expect(result).toEqual({ status: 'error', message: 'Invalid slug: path traversal detected.' });
		expect(writeFileSync).not.toHaveBeenCalled();
	});

	it('writes the file when the secret and slug are valid (happy path)', async () => {
		process.env['OBSIDIAN_SYNC_SECRET'] = 'correct-secret';

		const event = createMockEvent({
			headers: { 'x-obsidian-secret': 'correct-secret' },
			body: { slug: 'algorithms/binary-search', content: '# Binary Search' },
		});
		const result = await handler(event);

		expect(writeFileSync).toHaveBeenCalledWith(
			expect.stringContaining(`algorithms${sep}binary-search.md`),
			'# Binary Search',
			'utf-8'
		);
		expect(result).toEqual({
			status: 'success',
			message: 'Note synced successfully.',
			file: 'algorithms/binary-search.md',
		});
	});
});
