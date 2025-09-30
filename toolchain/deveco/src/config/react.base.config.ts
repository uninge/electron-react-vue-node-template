import path from 'node:path';
import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {pluginReact} from "@rsbuild/plugin-react";
import {baseConfig} from "./base.config";

export const reactBaseConfig: RsbuildConfig = mergeRsbuildConfig(baseConfig, {
	mode: 'production',
	source: {
		entry: {
			index: path.resolve(process.cwd(), 'src', 'index.tsx'),
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
	plugins: [pluginReact()]
})
