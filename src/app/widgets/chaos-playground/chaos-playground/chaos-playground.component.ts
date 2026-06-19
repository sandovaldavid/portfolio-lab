import {
	ChangeDetectionStrategy,
	Component,
	PLATFORM_ID,
	computed,
	inject,
	signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type SystemState = 'healthy' | 'degraded' | 'circuit-open';

interface Node {
	id: string;
	label: string;
	x: number;
	y: number;
	desc: string;
	tech: string;
}

interface Edge {
	from: string;
	to: string;
	id: string;
	isDead?: boolean;
}

const NODES: Node[] = [
	{
		id: 'frontend',
		label: 'Angular 21\nFrontend',
		x: 80,
		y: 140,
		desc: 'SPA with SSR via Analog. OnPush + Signals for O(1) change detection.',
		tech: 'Angular 21 · Analog · JetBrains Mono',
	},
	{
		id: 'gateway',
		label: 'API\nGateway',
		x: 280,
		y: 140,
		desc: 'YARP reverse proxy. Handles auth, rate-limiting and request routing.',
		tech: '.NET 8 YARP · JWT · Rate Limiting',
	},
	{
		id: 'service',
		label: '.NET 8\nService',
		x: 480,
		y: 140,
		desc: 'Clean Architecture CQRS. MediatR pipelines with Polly resilience policies.',
		tech: '.NET 8 · MediatR · Polly',
	},
	{
		id: 'db',
		label: 'SQL\nServer',
		x: 480,
		y: 320,
		desc: 'Primary transactional store. Dapper for perf-critical reads, EF Core for writes.',
		tech: 'SQL Server 2022 · Dapper · EF Core',
	},
	{
		id: 'cache',
		label: 'Redis\nCache',
		x: 280,
		y: 320,
		desc: 'IDistributedCache for eligibility results (5-min TTL). Fallback to DB on miss.',
		tech: 'Redis 7 · StackExchange.Redis',
	},
	{
		id: 'dlq',
		label: 'Dead\nLetter',
		x: 680,
		y: 230,
		desc: 'Failed commands queued here. Nightly replay job retries with backoff.',
		tech: 'Azure Service Bus · Dead Letter Queue',
	},
];

const EDGES: Edge[] = [
	{ id: 'fe-gw', from: 'frontend', to: 'gateway' },
	{ id: 'gw-svc', from: 'gateway', to: 'service' },
	{ id: 'svc-db', from: 'service', to: 'db' },
	{ id: 'svc-cache', from: 'service', to: 'cache' },
	{ id: 'cache-db', from: 'cache', to: 'db' },
	{ id: 'svc-dlq', from: 'service', to: 'dlq', isDead: true },
];

@Component({
	selector: 'app-chaos-playground',
	imports: [],
	templateUrl: './chaos-playground.component.html',
	styleUrl: './chaos-playground.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChaosPlaygroundComponent {
	private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

	readonly nodes = NODES;
	readonly edges = EDGES;

	readonly systemState = signal<SystemState>('healthy');
	readonly hoveredNode = signal<string | null>(null);
	readonly injecting = signal(false);

	readonly isHealthy = computed(() => this.systemState() === 'healthy');
	readonly isDegraded = computed(() => this.systemState() === 'degraded');
	readonly isCircuitOpen = computed(() => this.systemState() === 'circuit-open');

	readonly statusLabel = computed(() => {
		switch (this.systemState()) {
			case 'healthy':
				return 'SYSTEM_OK';
			case 'degraded':
				return 'DB_FAULT_DETECTED';
			case 'circuit-open':
				return 'CIRCUIT_OPEN · FAILOVER_ACTIVE';
		}
	});

	readonly activeNode = computed<Node | null>(() => {
		const id = this.hoveredNode();
		return id ? (NODES.find((n) => n.id === id) ?? null) : null;
	});

	nodeLabel(node: Node): string {
		return node.label.replace(/[\r\n]+/g, ' ');
	}

	nodeClass(node: Node): string {
		const state = this.systemState();
		if (node.id === 'db') {
			if (state === 'degraded') return 'node-degraded';
			if (state === 'circuit-open') return 'node-dead';
		}
		if (node.id === 'dlq' && state === 'circuit-open') return 'node-active-dlq';
		return 'node-healthy';
	}

	edgeClass(edge: Edge): string {
		const state = this.systemState();
		if (edge.isDead) {
			return state === 'circuit-open' ? 'edge-dlq-active' : 'edge-hidden';
		}
		if ((edge.id === 'svc-db' || edge.id === 'cache-db') && state !== 'healthy') {
			return state === 'degraded' ? 'edge-degraded' : 'edge-dead';
		}
		return 'edge-normal';
	}

	injectFault(): void {
		if (!this.isBrowser) return;
		if (this.systemState() !== 'healthy') return;
		this.injecting.set(true);
		setTimeout(() => {
			this.systemState.set('degraded');
			this.injecting.set(false);
		}, 400);
		setTimeout(() => {
			this.systemState.set('circuit-open');
		}, 1800);
	}

	reset(): void {
		this.systemState.set('healthy');
	}

	private nodePos(id: string): { x: number; y: number } {
		return NODES.find((n) => n.id === id) ?? { x: 0, y: 0 };
	}

	private edgeEndpoints(edge: Edge): { x1: number; y1: number; x2: number; y2: number } {
		const f = this.nodePos(edge.from);
		const t = this.nodePos(edge.to);
		const dx = t.x - f.x;
		const dy = t.y - f.y;
		const absDx = Math.abs(dx);
		const absDy = Math.abs(dy);
		// Clamp to box edge: node box is 100×60 (±50, ±30)
		if (absDx >= absDy) {
			return { x1: f.x + (dx > 0 ? 50 : -50), y1: f.y, x2: t.x + (dx > 0 ? -50 : 50), y2: t.y };
		} else {
			return { x1: f.x, y1: f.y + (dy > 0 ? 30 : -30), x2: t.x, y2: t.y + (dy > 0 ? -30 : 30) };
		}
	}

	getEdgeX1(edge: Edge): number {
		return this.edgeEndpoints(edge).x1;
	}
	getEdgeY1(edge: Edge): number {
		return this.edgeEndpoints(edge).y1;
	}
	getEdgeX2(edge: Edge): number {
		return this.edgeEndpoints(edge).x2;
	}
	getEdgeY2(edge: Edge): number {
		return this.edgeEndpoints(edge).y2;
	}

	getEdgeMarker(edge: Edge): string {
		const cls = this.edgeClass(edge);
		if (cls === 'edge-dlq-active') return 'url(#arrow-secondary)';
		if (cls === 'edge-degraded' || cls === 'edge-dead') return 'url(#arrow-danger)';
		if (cls === 'edge-normal') return 'url(#arrow-primary)';
		return 'url(#arrow-normal)';
	}
}
