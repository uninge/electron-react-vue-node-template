import type { BuildResult } from '@rsbuild/core';
import { loadConfig, mergeRsbuildConfig, createRsbuild } from '@rsbuild/core';
import {electronDevConfig} from "../config/electron.dev.config";
import {electronProdConfig} from "../config/electron.prod.config";

export async function runElectronDev(): Promise<BuildResult> {
	const { content } = await loadConfig()

	const build = await createRsbuild({
		rsbuildConfig: mergeRsbuildConfig(electronDevConfig, content),
	});

	return await build.build({
		watch: true
	});
}

export async function runElectronProd(): Promise<BuildResult> {
	const { content } = await loadConfig()

	const build = await createRsbuild({
		rsbuildConfig: mergeRsbuildConfig(electronProdConfig, content),
	});

	return await build.build({});
}
