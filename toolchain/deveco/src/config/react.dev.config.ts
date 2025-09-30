import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {reactBaseConfig} from "./react.base.config";

export const reactDevConfig: RsbuildConfig = mergeRsbuildConfig(reactBaseConfig, {
	mode: 'development',
	dev: {
		hmr: true,
		liveReload: false,
		client: {
			overlay: true,
		}
	}
})
