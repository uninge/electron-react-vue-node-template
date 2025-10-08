import fs from "node:fs";
import path from "node:path";
import type {IStartElectron} from 'rsbuild-electron-dev-plugin';

export async function setEnv() {
	const configPath = path.resolve(process.cwd(), './deveco.config.js');
	if (fs.existsSync(configPath)) {
		const config = (await import(path.resolve(process.cwd(), './deveco.config.js'))).default;

		await config.setEnv();
	}
}

export async function getMainCustomConfig(): Promise<{ main: IStartElectron }> {
	const configPath = path.resolve(process.cwd(), './deveco.config.js');
	if (fs.existsSync(configPath)) {
		const config = (await import(path.resolve(process.cwd(), './deveco.config.js'))).default;

		return {
			main:  Object.assign({}, await config.getMainConfig())
		};
	}
	process.exit(1);
}
