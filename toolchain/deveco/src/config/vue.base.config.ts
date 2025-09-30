import path from 'node:path';
import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {baseConfig} from "./base.config";
import {pluginVue} from "@rsbuild/plugin-vue";

export const vueBaseConfig: RsbuildConfig = mergeRsbuildConfig(baseConfig, {
	mode: 'production',
	source: {
		entry: {
			index: path.resolve(process.cwd(), 'src', 'index.ts'),
		}
	},
	output: {
		target: 'web',
	},
	tools: {
		rspack: {
			// target: 'electron-renderer',
		}
	},
	html: {
		template: path.resolve(process.cwd(), 'public', 'index.html'),
	},
	plugins: [pluginVue()]
})
