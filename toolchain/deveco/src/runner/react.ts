import type { StartServerResult, BuildResult } from '@rsbuild/core';
import { loadConfig, mergeRsbuildConfig, createRsbuild } from '@rsbuild/core';
import {reactDevConfig} from "../config/react.dev.config";
import {reactProdConfig} from "../config/react.prod.config";

export async function runReactDev(): Promise<StartServerResult> {
	const { content } = await loadConfig()

	const build = await createRsbuild({
		rsbuildConfig: mergeRsbuildConfig(reactDevConfig, content),
	});

	return await build.startDevServer({
		getPortSilently: true
	});
}

export async function runReactProd(): Promise<BuildResult> {
	const { content } = await loadConfig()

	const build = await createRsbuild({
		rsbuildConfig: mergeRsbuildConfig(reactProdConfig, content),
	});

	return await build.build({});
}
