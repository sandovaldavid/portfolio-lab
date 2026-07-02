import { describe, it, expect, vi, beforeEach } from 'vitest';
import { truncate, buildElement, loadFont } from './og-image';

const satoriMock = vi.fn().mockResolvedValue('<svg></svg>');
const renderMock = vi.fn().mockReturnValue({ asPng: () => Buffer.from('fake-png') });

vi.mock('satori', () => ({
	default: (...args: unknown[]) => satoriMock(...args),
}));

vi.mock('@resvg/resvg-js', () => ({
	Resvg: vi.fn().mockImplementation(function Resvg() {
		return { render: renderMock };
	}),
}));

vi.mock('fs', () => {
	const readFileSync = vi.fn(() => ({ buffer: new ArrayBuffer(8) }));
	return { readFileSync, default: { readFileSync } };
});

interface OgImageEvent {
	__query: Record<string, string>;
	node: {
		res: {
			headers: Record<string, string>;
			setHeader: (name: string, value: string) => void;
		};
	};
}

function mockEvent(query: Record<string, string> = {}): OgImageEvent {
	const headers: Record<string, string> = {};
	return {
		__query: query,
		node: {
			res: {
				headers,
				setHeader: (name: string, value: string) => {
					headers[name] = value;
				},
			},
		},
	};
}

vi.mock('h3', async () => {
	const actual = await vi.importActual<Record<string, unknown>>('h3');
	return {
		...actual,
		getQuery: (event: OgImageEvent) => event.__query ?? {},
	};
});

describe('truncate', () => {
	it('returns short text unchanged', () => {
		expect(truncate('short title', 80)).toBe('short title');
	});

	it('truncates long text and appends an ellipsis', () => {
		const long = 'a'.repeat(100);
		const result = truncate(long, 80);

		expect(result).toHaveLength(81);
		expect(result.endsWith('…')).toBe(true);
	});
});

describe('buildElement', () => {
	it('embeds the truncated title, description, and type badge', () => {
		const element = buildElement({
			title: 'a'.repeat(100),
			description: 'a description',
			type: 'note',
		});

		const json = JSON.stringify(element);
		expect(json).toContain('// NOTE');
		expect(json).toContain('a description');
		expect(json).toContain(truncate('a'.repeat(100), 80));
	});
});

describe('loadFont', () => {
	it('resolves both font weights when files are readable', async () => {
		const fonts = await loadFont();
		expect(fonts).toHaveLength(2);
		expect(fonts.map((f) => f.weight)).toEqual([400, 700]);
	});
});

describe('og-image route', () => {
	beforeEach(() => {
		satoriMock.mockClear();
		renderMock.mockClear();
	});

	it('generates a PNG with default title/description/type when params are missing', async () => {
		const { default: handler } = await import('./og-image');
		const event = mockEvent();

		const result = await handler(event as never);

		expect(satoriMock).toHaveBeenCalled();
		expect(result).toBeInstanceOf(Buffer);
		expect(event.node.res.headers['Content-Type']).toBe('image/png');
		expect(event.node.res.headers['Cache-Control']).toContain('max-age=86400');
	});

	it('generates a PNG using the provided params', async () => {
		const { default: handler } = await import('./og-image');
		const event = mockEvent({
			title: 'Custom Title',
			description: 'Custom description',
			type: 'case-study',
		});

		await handler(event as never);

		const [element] = satoriMock.mock.calls[satoriMock.mock.calls.length - 1] as [
			ReturnType<typeof buildElement>,
		];
		const json = JSON.stringify(element);
		expect(json).toContain('Custom Title');
		expect(json).toContain('Custom description');
		expect(json).toContain('// CASE-STUDY');
	});
});
