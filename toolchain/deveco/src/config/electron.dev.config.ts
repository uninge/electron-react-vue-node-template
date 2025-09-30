import type {RsbuildConfig} from '@rsbuild/core';
import { mergeRsbuildConfig } from '@rsbuild/core';
import rsbuildElectronDevPlugin from "rsbuild-electron-dev-plugin";
import {electronBaseConfig} from "./electron.base.config";
import {getCustomConfig} from "../common/helpler";
const customMianConfig = getCustomConfig().main;

export const electronDevConfig: RsbuildConfig = mergeRsbuildConfig(electronBaseConfig, {
	mode: 'development',
	plugins: [
		rsbuildElectronDevPlugin(customMianConfig)
	]
})
