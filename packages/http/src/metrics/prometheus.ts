import { collectDefaultMetrics, Gauge } from 'prom-client';

export class PrometheusMetrics {
	public readonly commandsUsed = new Gauge({
		name: 'commands_used',
		help: 'The usage of each command',
		labelNames: ['command'],
	});

	public constructor() {
		collectDefaultMetrics();
	}

	public incrementCommandUsed(command: string) {
		this.commandsUsed.labels(command).inc();
	}
}
