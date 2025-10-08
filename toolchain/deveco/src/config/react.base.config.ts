import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {pluginReact} from "@rsbuild/plugin-react";
import {baseConfig} from "./base.config";
import {reactEntry, reactTemplate} from "../common/module.path";

export const reactBaseConfig: RsbuildConfig = mergeRsbuildConfig(baseConfig, {
	mode: 'production',
	source: {
		entry: {
			index: [reactEntry],
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
		template: [reactTemplate],
	},
	plugins: [pluginReact()]
})
