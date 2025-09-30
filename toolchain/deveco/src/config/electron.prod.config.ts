import type {RsbuildConfig} from '@rsbuild/core';
import { mergeRsbuildConfig } from '@rsbuild/core';
import {electronBaseConfig} from "./electron.base.config";

export const electronProdConfig: RsbuildConfig = mergeRsbuildConfig(electronBaseConfig, {
	mode: 'production',
})
