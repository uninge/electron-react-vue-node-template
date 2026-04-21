import fs from "node:fs";
import path from "node:path";
import { createJiti } from "jiti";
import type {IStartElectron} from 'rsbuild-electron-dev-plugin';
import type {DevecoConfig} from './types';

const jiti = createJiti(import.meta.url);

function findConfigFile(): string | null {
	const cwd = process.cwd();
	const configFiles = [
		'deveco.config.ts',
		'deveco.config.js',
	];

	for (const file of configFiles) {
		const configPath = path.resolve(cwd, file);
		if (fs.existsSync(configPath)) {
			return configPath;
		}
	}

	return null;
}

export async function setEnv(): Promise<void> {
	try {
		const configPath = findConfigFile();
		
		if (!configPath) {
			console.warn('No deveco.config.ts found, skipping environment setup');
			return;
		}

		const config: DevecoConfig = await jiti.import(configPath, { default: true });

		if (config && typeof config.setEnv === 'function') {
			await config.setEnv();
		}
	} catch (error) {
		console.error('Failed to set environment:', error);
		throw error;
	}
}

export async function getMainCustomConfig(): Promise<{ main: IStartElectron }> {
	try {
		const configPath = findConfigFile();
		
		if (!configPath) {
			throw new Error('Config file not found. Please create deveco.config.ts');
		}
		
		const config: DevecoConfig = await jiti.import(configPath, { default: true });

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
