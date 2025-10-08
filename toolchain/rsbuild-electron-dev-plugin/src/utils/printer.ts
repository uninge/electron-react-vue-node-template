import chalk from 'chalk';
import type { ForegroundColorName } from 'chalk'

export function printElectronLog(data: Uint8Array, color: ForegroundColorName) {
	let log = '';
	const arr = data.toString().split(/\r?\n/);
	arr.forEach((line) => {
		line = line.replace(/\r?\n/gm, '').trim();
		if (line) {
			log += `  ${line}\n`;
		}
	});
	chalk.red
	if (/[0-9A-z]+/.test(log)) {
		console.log(
			chalk[color].bold('┏ Electron ---------------------------') +
			'\n' +
			log.replace(/^(\r?\n)*/, '').replace(/(\r?\n)*&/, '') +
			chalk[color].bold('┗ ------------------------------------'),
		);
	}
}

