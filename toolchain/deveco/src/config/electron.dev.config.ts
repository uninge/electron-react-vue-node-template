import type {RsbuildConfig} from '@rsbuild/core';
import { mergeRsbuildConfig } from '@rsbuild/core';
import rsbuildElectronDevPlugin from "rsbuild-electron-dev-plugin";
import {electronBaseConfig} from "./electron.base.config";
import {getMainCustomConfig} from "../common/helper";
import {electronDevEntry, electronProdEntry} from "../common/module.path";
const customMianConfig = (await getMainCustomConfig())?.main;

export const electronDevConfig: RsbuildConfig = mergeRsbuildConfig(electronBaseConfig, {
	mode: 'development',
	source: {
		...electronBaseConfig.source,
		entry: {
			...electronBaseConfig.source?.entry,
			index: [electronDevEntry, electronProdEntry],
		}
	},
	plugins: [
		rsbuildElectronDevPlugin(customMianConfig)
	]
})
