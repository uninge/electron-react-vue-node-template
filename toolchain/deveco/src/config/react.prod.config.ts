import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {reactBaseConfig} from "./react.base.config";

export const reactProdConfig: RsbuildConfig = mergeRsbuildConfig(reactBaseConfig, {
	mode: 'production',
})
