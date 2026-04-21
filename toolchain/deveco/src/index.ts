await (await import('./common/helper')).setEnv();

import { Command } from 'commander';
import { PROJECT_REPO } from './common/constant';

export { defineConfig, type DevecoConfig } from './common/types';

const program = new Command();
program
	.command('dev')
	.description('Run dev...')
	.argument('<project>')
	.action(async (project, options) => {
		console.info('start dev', project, options);
		await startDev(project);
	});

program
	.command('build')
	.description('Run build...')
	.argument('<project>')
	.action(async (project, options) => {
		console.info('start build', project, options);
		await startProd(project);
	});

program.parse();

async function startDev(project: (typeof PROJECT_REPO)[keyof typeof PROJECT_REPO]): Promise<void> {
	process.env.CUSTOM_PROJECT = project;

	switch (project) {
		case PROJECT_REPO.ELECTRON_MAIN:
			await (await import('./runner/electron')).runElectronDev();
			break;
		case PROJECT_REPO.REACT_RENDER:
			await (await import('./runner/react')).runReactDev();
			break;
		case PROJECT_REPO.VUE_RENDER:
			await (await import('./runner/vue')).runVueDev();
			break;
		case PROJECT_REPO.NODE_SERVER:
			await (await import('./runner/node')).runNodeDev();
			break;
		default:
			console.info(`Unknown project ${project}`);
			break;
	}
}

async function startProd(project: (typeof PROJECT_REPO)[keyof typeof PROJECT_REPO]): Promise<void> {
	process.env.CUSTOM_PROJECT = project;

	switch (project) {
		case PROJECT_REPO.ELECTRON_MAIN:
			await (await import('./runner/electron')).runElectronProd();
			break;
		case PROJECT_REPO.REACT_RENDER:
			await (await import('./runner/react')).runReactProd();
			break;
		case PROJECT_REPO.VUE_RENDER:
			await (await import('./runner/vue')).runVueProd();
			break;
		case PROJECT_REPO.NODE_SERVER:
			await (await import('./runner/node')).runNodeProd();
			break;
		default:
			console.info(`Unknown project ${project}`);
			break;
	}
}
