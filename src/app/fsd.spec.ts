import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Define FSD layers and their levels (higher number = higher layer)
const layers: Record<string, number> = {
	shared: 1,
	entities: 2,
	features: 3,
	widgets: 4,
	pages: 5,
};

function getLayer(filePath: string): string | null {
	const normalized = path.normalize(filePath);
	const parts = normalized.split(path.sep);
	const appIdx = parts.indexOf('app');
	if (appIdx !== -1 && appIdx + 1 < parts.length) {
		const layer = parts[appIdx + 1];
		if (layer in layers) {
			return layer;
		}
	}
	return null;
}

function resolveImportLayer(importPath: string, filePath: string): string | null {
	if (importPath.startsWith('@shared/')) return 'shared';
	if (importPath.startsWith('@entities/')) return 'entities';
	if (importPath.startsWith('@features/')) return 'features';
	if (importPath.startsWith('@widgets/')) return 'widgets';

	if (importPath.startsWith('.') || importPath.startsWith('..')) {
		const resolvedPath = path.resolve(path.dirname(filePath), importPath);
		return getLayer(resolvedPath);
	}

	return null;
}

function getFiles(dir: string): string[] {
	const subdirs = fs.readdirSync(dir);
	const files = subdirs.map((subdir) => {
		const res = path.resolve(dir, subdir);
		return fs.statSync(res).isDirectory() ? getFiles(res) : res;
	});
	return files.reduce<string[]>((a, f) => a.concat(f), []);
}

describe('Feature-Sliced Design (FSD) Architectural Rules', () => {
	it('should not violate FSD layer dependencies (no upward imports)', () => {
		const appDir = path.resolve(__dirname);
		const tsFiles = getFiles(appDir).filter(
			(file) => file.endsWith('.ts') && !file.endsWith('.spec.ts')
		);

		// Regex to match static: import ... from '...' and dynamic: import('...')
		const importPattern = /(?:import\s+.*?\s+from\s+['"]([^'"]+)['"])|(?:import\(['"]([^'"]+)['"]\))/g;
		const violations: string[] = [];

		for (const file of tsFiles) {
			const currentLayer = getLayer(file);
			if (!currentLayer) continue;

			const content = fs.readFileSync(file, 'utf-8');
			let match;
			importPattern.lastIndex = 0;
			while ((match = importPattern.exec(content)) !== null) {
				const importPath = match[1] || match[2];
				if (!importPath) continue;

				const importedLayer = resolveImportLayer(importPath, file);
				if (!importedLayer) continue;

				const currentLevel = layers[currentLayer];
				const importedLevel = layers[importedLayer];

				if (importedLevel > currentLevel) {
					const relFile = path.relative(path.resolve(appDir, '..'), file);
					violations.push(
						`File "${relFile}" (${currentLayer}) imports "${importPath}" (${importedLayer})`
					);
				}
			}
		}

		expect(violations).toEqual([]);
	});
});
