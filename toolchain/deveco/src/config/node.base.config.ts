import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {baseConfig} from "./base.config";
import {nodeEntry} from "../common/module.path";

export const nodeBaseConfig: RsbuildConfig = mergeRsbuildConfig(baseConfig, {
	mode: 'production',
	source: {
		entry: {
			index: [nodeEntry],
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
