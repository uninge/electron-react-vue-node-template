import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {baseConfig} from "./base.config";
import {pluginVue} from "@rsbuild/plugin-vue";
import {vueEntry, vueTemplate} from "../common/module.path";

export const vueBaseConfig: RsbuildConfig = mergeRsbuildConfig(baseConfig, {
	mode: 'production',
	source: {
		entry: {
			index: [vueEntry],
		}
	},
	output: {
		target: 'web',
		assetPrefix: './',
	},
	tools: {
		rspack: {
			// target: 'electron-renderer',
		}
	},
	html: {
		template: [vueTemplate],
	},
	plugins: [pluginVue()]
})
