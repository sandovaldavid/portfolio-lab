import { createError, defineEventHandler } from 'h3';

interface ContributionDay {
	date: string;
	level: number;
}

interface ContributionWeek {
	days: ContributionDay[];
}

interface ContributionData {
	total: number;
	weeks: ContributionWeek[];
}

const GITHUB_USERNAME = 'sandovaldavid';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

let cache: { data: ContributionData; expiresAt: number } | null = null;

function parseContributions(html: string): ContributionData {
	const totalMatch = html.match(/(\d+[\d,]*)\s+contributions?\s+in the last year/i);
	const total = totalMatch ? Number(totalMatch[1].replace(/,/g, '')) : 0;

	const cellRegex =
		/<td[^>]+class="ContributionCalendar-day"[^>]+data-date="(\d{4}-\d{2}-\d{2})"[^>]+data-level="(\d)"[^>]*>/gi;
	const days: ContributionDay[] = [];

	let match;
	while ((match = cellRegex.exec(html)) !== null) {
		days.push({ date: match[1], level: Number(match[2]) });
	}

	// Group days into weeks (GitHub always renders 7 days per column, starting on Sunday).
	const weeks: ContributionWeek[] = [];
	for (let i = 0; i < days.length; i += 7) {
		weeks.push({ days: days.slice(i, i + 7) });
	}

	return { total, weeks };
}

export default defineEventHandler(async () => {
	const now = Date.now();
	if (cache && cache.expiresAt > now) {
		return cache.data;
	}

	const response = await fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions`, {
		headers: {
			Accept: 'text/html',
			'User-Agent': 'devsandoval.me',
		},
	});

	if (!response.ok) {
		throw createError({
			statusCode: response.status,
			statusMessage: 'Failed to fetch GitHub contributions',
		});
	}

	const html = await response.text();
	const data = parseContributions(html);

	cache = { data, expiresAt: now + CACHE_TTL_MS };
	return data;
});
