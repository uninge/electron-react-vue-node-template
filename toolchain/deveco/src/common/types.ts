import type { IStartElectron } from 'rsbuild-electron-dev-plugin';

export interface DevecoConfig {
	setEnv?: () => Promise<void> | void;
	getMainConfig?: () => Promise<IStartElectron> | IStartElectron;
}

export function defineConfig(config: DevecoConfig): DevecoConfig {
	return config;
}
