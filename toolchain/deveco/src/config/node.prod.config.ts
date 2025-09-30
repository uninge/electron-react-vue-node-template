import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {nodeBaseConfig} from "./node.base.config";

export const nodeProdConfig: RsbuildConfig = mergeRsbuildConfig(nodeBaseConfig, {
	mode: 'production',
})
