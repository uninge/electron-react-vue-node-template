import type { RsbuildConfig } from '@rsbuild/core';
import { mergeRsbuildConfig } from '@rsbuild/core';
import rsbuildElectronDevPlugin from 'rsbuild-electron-dev-plugin';
import { electronBaseConfig } from './electron.base.config';
import { getMainCustomConfig } from '../common/helper';
import { electronDevEntry, electronProdEntry } from '../common/module.path';

export async function getElectronDevConfig(): Promise<RsbuildConfig> {
	const customMianConfig = (await getMainCustomConfig())?.main;

	return mergeRsbuildConfig(electronBaseConfig, {
		mode: 'development',
		source: {
			entry: {
				index: [electronDevEntry, electronProdEntry],
			},
		},
		plugins: [rsbuildElectronDevPlugin(customMianConfig)],
	});
}
