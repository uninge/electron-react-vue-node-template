import chalk from 'chalk';
import type { ForegroundColorName } from 'chalk';

export function printElectronLog(data: Uint8Array, color: ForegroundColorName): void {
	const text = data.toString();
	const lines = text.split(/\r?\n/).filter((line) => line.trim());

	if (lines.length === 0) {
		return;
	}

	const formattedLog = lines.map((line) => `  ${line.trim()}`).join('\n');

	if (!/[a-zA-Z0-9]/.test(formattedLog)) {
		return;
	}

	console.log(
		chalk[color].bold('┏ Electron ---------------------------') +
			'\n' +
			formattedLog +
			'\n' +
			chalk[color].bold('┗ ------------------------------------')
	);
}
