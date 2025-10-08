import type {RsbuildConfig} from '@rsbuild/core';
import { mergeRsbuildConfig } from '@rsbuild/core';
import rsbuildElectronDevPlugin from "rsbuild-electron-dev-plugin";
import {electronBaseConfig} from "./electron.base.config";
import {getCustomConfig} from "../common/helpler";
import {electronDevEntry, electronProdEntry} from "../common/module.path";
const customMianConfig = getCustomConfig().main;

export const electronDevConfig: RsbuildConfig = mergeRsbuildConfig(electronBaseConfig, {
	mode: 'development',
	source: {
		...electronBaseConfig.source,
		entry: {
			...electronBaseConfig.source?.entry,
			index: [electronDevEntry, electronProdEntry],
		},
		define: {
			'process.env.CUSTOM_RENDER_DEV_HOST': JSON.stringify(process.env.CUSTOM_RENDER_DEV_HOST),
			'process.env.CUSTOM_RENDER_DEV_PORT': JSON.stringify(process.env.CUSTOM_RENDER_DEV_PORT),
		}
	},
	plugins: [
		rsbuildElectronDevPlugin(customMianConfig)
	]
})
