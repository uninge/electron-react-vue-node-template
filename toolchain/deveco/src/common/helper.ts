import fs from "node:fs";
import path from "node:path";
import type {IStartElectron} from 'rsbuild-electron-dev-plugin';

export async function setEnv(): Promise<void> {
	try {
		const configPath = path.resolve(process.cwd(), './deveco.config.js');
		if (fs.existsSync(configPath)) {
			const config = (await import(configPath)).default;

			if (typeof config.setEnv === 'function') {
				await config.setEnv();
			}
		}
	} catch (error) {
		console.error('Failed to set environment:', error);
		throw error;
	}
}

export async function getMainCustomConfig(): Promise<{ main: IStartElectron }> {
	try {
		const configPath = path.resolve(process.cwd(), './deveco.config.js');
		
		if (!fs.existsSync(configPath)) {
			throw new Error(`Config file not found: ${configPath}`);
		}
		
		const config = (await import(configPath)).default;

		if (!config || typeof config.getMainConfig !== 'function') {
			throw new Error('Invalid config: getMainConfig function is required');
		}

		const mainConfig = await config.getMainConfig();
		
		if (!mainConfig) {
			throw new Error('Main config is required');
		}

		return {
			main: Object.assign({}, mainConfig)
		};
	} catch (error) {
		console.error('Failed to get main custom config:', error);
		throw error;
	}
}
