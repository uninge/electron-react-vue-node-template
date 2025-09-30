import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {vueBaseConfig} from "./vue.base.config";

export const vueProdConfig: RsbuildConfig = mergeRsbuildConfig(vueBaseConfig, {
	mode: 'production',
})
