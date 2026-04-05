import { mergeRsbuildConfig } from '@rsbuild/core';
import type { RsbuildConfig } from '@rsbuild/core';
import { baseConfig } from './base.config';
import { electronPreloadScript } from '../common/module.path';

export const electronBaseConfig: RsbuildConfig = mergeRsbuildConfig(baseConfig, {
	mode: 'development',
	source: {
		entry: {
			preload: [electronPreloadScript],
		},
	},
	output: {
		target: 'node',
		module: true,
	},
	tools: {
		rspack: {
			target: 'electron-main',
		},
	},
});
