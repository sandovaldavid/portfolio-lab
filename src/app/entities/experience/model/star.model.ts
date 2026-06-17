export type StarMetricCategory = 'latency' | 'throughput' | 'scalability' | 'memory' | 'quality';

export interface StarEntry {
	id: string;
	title: string;
	metric: string;
	metricValue: string;
	pattern: string;
	stack: string[];
	category: StarMetricCategory;
	detail: string;
	codeSnippet?: string;
}
