import type { BuildResult } from '@rsbuild/core';
import { loadConfig, mergeRsbuildConfig, createRsbuild } from '@rsbuild/core';
import {nodeDevConfig} from "../config/node.dev.config";
import {nodeProdConfig} from "../config/node.prod.config";

export async function runNodeDev(): Promise<BuildResult> {
	const { content } = await loadConfig()

	const build = await createRsbuild({
		rsbuildConfig: mergeRsbuildConfig(nodeDevConfig, content),
	});

	return await build.build({
		watch: true
	});
}

export async function runNodeProd(): Promise<BuildResult> {
	const { content } = await loadConfig()

	const build = await createRsbuild({
		rsbuildConfig: mergeRsbuildConfig(nodeProdConfig, content),
	});

	return await build.build({});
}
