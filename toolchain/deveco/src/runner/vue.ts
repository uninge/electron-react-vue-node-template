import type { StartServerResult, BuildResult } from '@rsbuild/core';
import { loadConfig, mergeRsbuildConfig, createRsbuild } from '@rsbuild/core';
import {vueDevConfig} from "../config/vue.dev.config";
import {vueProdConfig} from "../config/vue.prod.config";

export async function runVueDev(): Promise<StartServerResult> {
	const { content } = await loadConfig()

	const build = await createRsbuild({
		rsbuildConfig: mergeRsbuildConfig(vueDevConfig, content),
	});

	return await build.startDevServer({
		getPortSilently: true
	});
}

export async function runVueProd(): Promise<BuildResult> {
	const { content } = await loadConfig()

	const build = await createRsbuild({
		rsbuildConfig: mergeRsbuildConfig(vueProdConfig, content),
	});

	return await build.build({});
}
