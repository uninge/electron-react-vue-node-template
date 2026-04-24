import { mergeRsbuildConfig } from '@rsbuild/core';
import type { RsbuildConfig } from '@rsbuild/core';
import { reactBaseConfig } from './react.base.config';

export const reactDevConfig: RsbuildConfig = mergeRsbuildConfig(reactBaseConfig, {
	mode: 'development',
	server: {
		host: '0.0.0.0',
	},
	dev: {
		hmr: true,
		liveReload: false,
		client: {
			overlay: true,
		},
	},
});
