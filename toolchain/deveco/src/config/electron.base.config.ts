import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {baseConfig} from "./base.config";
import {electronPreloadScript, electronProdEntry} from "../common/module.path";

export const electronBaseConfig: RsbuildConfig = mergeRsbuildConfig(baseConfig, {
	mode: 'development',
	source: {
		entry: {
			index: [electronProdEntry],
			preload: [electronPreloadScript],
		}
	},
	output: {
		target: 'node',
	},
	tools: {
		rspack: {
			target: 'electron-main',
		}
	}
})
