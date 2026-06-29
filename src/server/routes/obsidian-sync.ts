import { defineEventHandler, getQuery, readBody } from 'h3';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, normalize, relative, sep } from 'path';

interface SyncPayload {
	slug: string;
	content: string;
}

export default defineEventHandler(async (event) => {
	if (event.node.req.method !== 'POST') {
		event.node.res.statusCode = 405;
		return { status: 'error', message: 'Method not allowed. Use POST.' };
	}

	const secret = process.env.OBSIDIAN_SYNC_SECRET || '';
	const query = getQuery(event);
	const token = (query.secret as string) || (event.node.req.headers['x-obsidian-secret'] as string);

	if (secret && token !== secret) {
		event.node.res.statusCode = 401;
		return { status: 'error', message: 'Unauthorized. Invalid secret.' };
	}

	const body = (await readBody(event).catch(() => ({}))) as Partial<SyncPayload>;
	const slug = body.slug;
	const content = body.content;

	if (!slug || !content) {
		event.node.res.statusCode = 400;
		return { status: 'error', message: 'Missing required fields: slug, content.' };
	}

	if (!slug.startsWith('algorithms/') && !slug.startsWith('systems/')) {
		event.node.res.statusCode = 400;
		return { status: 'error', message: 'Slug must start with algorithms/ or systems/.' };
	}

	const baseDir = resolve(process.cwd(), 'src', 'content');
	const target = normalize(resolve(baseDir, `${slug}.md`));
	const relativePath = relative(baseDir, target);

	if (relativePath.startsWith(`..${sep}`) || relativePath.startsWith(`..`)) {
		event.node.res.statusCode = 400;
		return { status: 'error', message: 'Invalid slug: path traversal detected.' };
	}

	const dir = target.slice(0, target.lastIndexOf(sep));
	if (!existsSync(dir)) {
		mkdirSync(dir, { recursive: true });
	}

	writeFileSync(target, content, 'utf-8');

	return {
		status: 'success',
		message: 'Note synced successfully.',
		file: `${slug}.md`,
	};
});
