export interface Logger {
	info(message: string, ...args: unknown[]): void;
	warn(message: string, ...args: unknown[]): void;
	error(message: string, ...args: unknown[]): void;
	debug(message: string, ...args: unknown[]): void;
}

class ConsoleLogger implements Logger {
	private prefix: string;

	constructor(prefix: string = 'Deveco') {
		this.prefix = prefix;
	}

	private formatMessage(level: string, message: string): string {
		const timestamp = new Date().toISOString();
		return `[${timestamp}] [${this.prefix}] [${level}] ${message}`;
	}

	info(message: string, ...args: unknown[]): void {
		console.info(this.formatMessage('INFO', message), ...args);
	}

	warn(message: string, ...args: unknown[]): void {
		console.warn(this.formatMessage('WARN', message), ...args);
	}

	error(message: string, ...args: unknown[]): void {
		console.error(this.formatMessage('ERROR', message), ...args);
	}

	debug(message: string, ...args: unknown[]): void {
		if (process.env.DEBUG === 'true') {
			console.debug(this.formatMessage('DEBUG', message), ...args);
		}
	}
}

export const logger = new ConsoleLogger();
