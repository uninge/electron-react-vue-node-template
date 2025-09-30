import path from 'node:path';
import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {baseConfig} from "./base.config";

export const electronBaseConfig: RsbuildConfig = mergeRsbuildConfig(baseConfig, {
	mode: 'development',
	source: {
		entry: {
			index: path.resolve(process.cwd(), 'src', 'index.ts'),
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
