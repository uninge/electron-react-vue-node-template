import { mergeRsbuildConfig } from '@rsbuild/core'
import type { RsbuildConfig } from '@rsbuild/core'
import {vueBaseConfig} from "./vue.base.config";

export const vueDevConfig: RsbuildConfig = mergeRsbuildConfig(vueBaseConfig, {
	mode: 'development',
	dev: {
		hmr: true,
		liveReload: false,
		client: {
			overlay: true,
		}
	}
})
