import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
	const query = getQuery(event);

	// Emulate latency if requested
	if (query['delay'] === 'true' || query['emulate3g'] === 'true') {
		await new Promise((resolve) => setTimeout(resolve, 1500));
	}

	return {
		status: 'healthy',
		uptime: process.uptime ? process.uptime() : 0,
		timestamp: new Date().toISOString(),
		metrics: {
			platform: process.platform,
			arch: process.arch,
			nodeVersion: process.version,
		},
		latencyEmulated: query['delay'] === 'true' || query['emulate3g'] === 'true',
	};
});
