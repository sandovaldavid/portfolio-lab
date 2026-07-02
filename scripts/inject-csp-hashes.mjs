import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { globSync } from 'tinyglobby';

const INLINE_SCRIPT = /<script(?![^>]*\ssrc=)[^>]*>([\s\S]*?)<\/script>/gi;

function hashesFor(html) {
	const hashes = new Set();
	for (const match of html.matchAll(INLINE_SCRIPT)) {
		const content = match[1];
		if (!content.trim()) continue;
		const hash = createHash('sha256').update(content, 'utf-8').digest('base64');
		hashes.add(`'sha256-${hash}'`);
	}
	return [...hashes];
}

const files = globSync('dist/analog/public/**/index.html');
let updated = 0;

for (const file of files) {
	const html = readFileSync(file, 'utf-8');
	const hashes = hashesFor(html);
	if (hashes.length === 0) continue;

	const meta = `<meta http-equiv="Content-Security-Policy" content="script-src 'self' ${hashes.join(' ')}">`;
	writeFileSync(file, html.replace('</head>', `  ${meta}\n</head>`), 'utf-8');
	updated++;
}

console.log(`[csp] injected script-src hashes into ${updated}/${files.length} prerendered pages`);
