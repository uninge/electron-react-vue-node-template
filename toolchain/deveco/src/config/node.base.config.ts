import path from 'node:path';
import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {baseConfig} from "./base.config";

export const nodeBaseConfig: RsbuildConfig = mergeRsbuildConfig(baseConfig, {
	mode: 'production',
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
			target: 'node',
		}
	}
})
