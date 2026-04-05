import type { RsbuildConfig } from '@rsbuild/core';
import { mergeRsbuildConfig } from '@rsbuild/core';
import { electronBaseConfig } from './electron.base.config';
import { electronProdEntry } from '../common/module.path';

export const electronProdConfig: RsbuildConfig = mergeRsbuildConfig(electronBaseConfig, {
	mode: 'production',
	source: {
		entry: {
			index: [electronProdEntry],
		},
	},
});
