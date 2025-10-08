import { spawn } from 'node:child_process';
import type { ChildProcessWithoutNullStreams } from 'node:child_process'
import type { RsbuildPlugin } from '@rsbuild/core'
import { printElectronLog } from './utils/printer'

export interface IStartElectron {
	electron: string;
	inspect: number;
	appPath: string;
}

export default function rsbuildElectronDevPlugin(config: IStartElectron): RsbuildPlugin {
	let electronProcess: ChildProcessWithoutNullStreams | undefined;

	return {
		name: 'rsbuildElectronDevPlugin',
		setup(build) {
			build.onAfterBuild(() => {
				if (electronProcess) {
					electronProcess.stdout.off('data', onElectronProcessStdout);
					electronProcess.stderr.off('data', onElectronProcessStderr);
					electronProcess.off('close', onElectronProcessClose);

					killElectronProcess(electronProcess.pid)
				}

				startElectron(config).then(childProcess => {
					electronProcess = childProcess;

					electronProcess.stdout.on('data', onElectronProcessStdout);
					electronProcess.stderr.on('data', onElectronProcessStderr);
					electronProcess.on('close', onElectronProcessClose);
				})
			})
		}
	}
}

async function startElectron(config: IStartElectron): Promise<ChildProcessWithoutNullStreams> {
	return new Promise((resolve, reject) => {
		const argv = ['--trace-warnings', `--inspect=${config.inspect}`, config.appPath];
		const childProcess = spawn(config.electron, argv, {
			cwd: process.cwd(),
			windowsHide: false,
		});

		resolve(childProcess);
	})
}

function killElectronProcess(pid?: number) {
	if (pid === undefined) {
		process.exit(0);
	} else {
		process.kill(pid);
	}
}

function onElectronProcessStdout(chunk: Uint8Array) {
	printElectronLog(chunk, 'cyan')
}

function onElectronProcessStderr(chunk: Uint8Array) {
	printElectronLog(chunk, 'red')
}

function onElectronProcessClose(code: number) {
	process.exit(code);
}

