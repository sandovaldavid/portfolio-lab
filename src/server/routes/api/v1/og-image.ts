import { defineEventHandler, getQuery } from 'h3';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

interface OGProps {
	title: string;
	description: string;
	type: string;
}

export function loadFont(): Promise<
	{ name: string; data: ArrayBuffer; weight: 400 | 700; style: 'normal' }[]
> {
	try {
		const font400: ArrayBuffer = readFileSync(
			resolve(
				process.cwd(),
				'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff2'
			)
		).buffer;
		const font700: ArrayBuffer = readFileSync(
			resolve(
				process.cwd(),
				'node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-700-normal.woff2'
			)
		).buffer;
		return Promise.resolve([
			{ name: 'JetBrains Mono', data: font400, weight: 400 as const, style: 'normal' as const },
			{ name: 'JetBrains Mono', data: font700, weight: 700 as const, style: 'normal' as const },
		]);
	} catch {
		return Promise.resolve([]);
	}
}

export function truncate(text: string, max: number): string {
	return text.length > max ? text.slice(0, max) + '…' : text;
}

export function buildElement({ title, description, type }: OGProps) {
	return {
		type: 'div',
		props: {
			style: {
				width: 1200,
				height: 630,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#020d1c',
				backgroundImage: 'radial-gradient(ellipse at 20% 50%, #071830 0%, #020d1c 70%)',
				padding: '60px 80px',
				fontFamily: 'JetBrains Mono',
				color: '#e2f0ff',
			},
			children: [
				// Top badge
				{
					type: 'div',
					props: {
						style: {
							display: 'flex',
							alignItems: 'center',
							gap: 12,
							marginBottom: 32,
						},
						children: [
							{
								type: 'div',
								props: {
									style: {
										border: '1px solid #3b9eff',
										backgroundColor: 'rgba(59, 158, 255, 0.1)',
										padding: '6px 14px',
										borderRadius: 2,
										fontSize: 14,
										color: '#3b9eff',
										letterSpacing: '0.1em',
										textTransform: 'uppercase',
									},
									children: `// ${type.toUpperCase()}`,
								},
							},
							{
								type: 'div',
								props: {
									style: { fontSize: 14, color: '#6b9fd4' },
									children: 'devsandoval.me',
								},
							},
						],
					},
				},
				// Title
				{
					type: 'div',
					props: {
						style: {
							fontSize: 52,
							fontWeight: 700,
							color: '#ffffff',
							marginBottom: 20,
							textAlign: 'center' as const,
							lineHeight: 1.2,
							maxWidth: 900,
							overflow: 'hidden',
							textOverflow: 'ellipsis',
						},
						children: truncate(title, 80),
					},
				},
				// Divider
				{
					type: 'div',
					props: {
						style: {
							width: 60,
							height: 2,
							backgroundColor: '#3b9eff',
							marginBottom: 20,
						},
					},
				},
				// Description
				{
					type: 'div',
					props: {
						style: {
							fontSize: 22,
							color: '#6b9fd4',
							textAlign: 'center' as const,
							lineHeight: 1.5,
							maxWidth: 800,
						},
						children: truncate(description, 160),
					},
				},
				// Bottom bar
				{
					type: 'div',
					props: {
						style: {
							position: 'absolute',
							bottom: 40,
							left: 80,
							right: 80,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							borderTop: '1px solid rgba(107, 159, 212, 0.3)',
							paddingTop: 20,
							fontSize: 14,
							color: '#4a7aad',
						},
						children: [
							{
								type: 'div',
								props: { children: 'David Sandoval · Software Engineer' },
							},
							{
								type: 'div',
								props: { children: new Date().toISOString().split('T')[0] },
							},
						],
					},
				},
			],
		},
	};
}

export default defineEventHandler(async (event) => {
	const query = getQuery(event);
	const title = (query['title'] as string) || 'David Sandoval';
	const description =
		(query['description'] as string) || 'Software Engineer · Angular & .NET Performance';
	const type = (query['type'] as string) || 'website';

	const fonts = await loadFont();

	const svg = await satori(buildElement({ title, description, type }), {
		width: 1200,
		height: 630,
		fonts,
	});

	const resvg = new Resvg(svg, {
		fitTo: { mode: 'width' as const, value: 1200 },
	});

	const pngBuffer = resvg.render().asPng();

	event.node.res.setHeader('Content-Type', 'image/png');
	event.node.res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
	event.node.res.setHeader('CDN-Cache-Control', 'public, max-age=86400');
	return pngBuffer;
});
