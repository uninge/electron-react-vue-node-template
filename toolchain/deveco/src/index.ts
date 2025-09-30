import {Command} from "commander";
import {PROJECT_REPO} from "./common/constant";
import {runElectronDev, runElectronProd} from "./runner/electron";
import {runReactDev, runReactProd} from "./runner/react";
import {runVueDev, runVueProd} from "./runner/vue";
import {runNodeDev, runNodeProd} from "./runner/node";

(async function setup() {
	const program = new Command();
	program
		.command('dev')
		.description('Run dev...')
		.argument('<project>')
		.action((project, options) => {
			console.log('start dev', project, options);
			startDev(project, options);
		});

	program
		.command('build')
		.description('Run build...')
		.argument('<project>')
		.action((project, options) => {
			console.log('start build', project, options);
			startProd(project, options);
		});

	program.parse();
})()


async function startDev(project: typeof PROJECT_REPO[keyof typeof PROJECT_REPO], options: Record<string, string>): Promise<void> {
	switch (project) {
		case PROJECT_REPO.ELECTRON_MAIN:
			process.env.CUSTOM_RENDER_HOST = '127.0.0.1'
			process.env.CUSTOM_RENDER_PROT = '3000'
			await runElectronDev();
			break;
		case PROJECT_REPO.REACT_RENDER:
			await runReactDev();
			break;
		case PROJECT_REPO.VUE_RENDER:
			await runVueDev();
			break;
		case PROJECT_REPO.NODE_SERVER:
			await runNodeDev();
			break;
		default:
			console.log(`Unknown project ${project}`);
			break
	}
}

async function startProd(project: typeof PROJECT_REPO[keyof typeof PROJECT_REPO], options: Record<string, string>): Promise<void> {
	switch (project) {
		case PROJECT_REPO.ELECTRON_MAIN:
			process.env.CUSTOM_RENDER_HOST = '127.0.0.1'
			process.env.CUSTOM_RENDER_PROT = '3000'
			await runElectronProd();
			break;
		case PROJECT_REPO.REACT_RENDER:
			await runReactProd();
			break;
		case PROJECT_REPO.VUE_RENDER:
			await runVueProd();
			break;
		case PROJECT_REPO.NODE_SERVER:
			await runNodeProd();
			break;
		default:
			console.log(`Unknown project ${project}`);
			break
	}
}
