import { spawn } from 'node:child_process';
import type { ChildProcessWithoutNullStreams } from 'node:child_process';
import type { RsbuildPlugin } from '@rsbuild/core';
import { printElectronLog } from './utils/printer';

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

					killElectronProcess(electronProcess.pid);
				}

				startElectron(config)
					.then((childProcess) => {
						electronProcess = childProcess;

						electronProcess.stdout.on('data', onElectronProcessStdout);
						electronProcess.stderr.on('data', onElectronProcessStderr);
						electronProcess.on('close', onElectronProcessClose);
						electronProcess.on('error', (error) => {
							console.error('Electron process error:', error);
						});
					})
					.catch((error) => {
						console.error('Failed to start Electron:', error);
					});
			});
		},
	};
}

async function startElectron(config: IStartElectron): Promise<ChildProcessWithoutNullStreams> {
	return new Promise((resolve, reject) => {
		try {
			const argv = ['--trace-warnings', `--inspect=${config.inspect}`, config.appPath];
			const childProcess = spawn(config.electron, argv, {
				cwd: process.cwd(),
				windowsHide: false,
				env: {
					...process.env,
					ELECTRON_ENABLE_LOGGING: 'true',
				},
			});

			childProcess.on('error', (error) => {
				reject(new Error(`Failed to spawn Electron process: ${error.message}`));
			});

			resolve(childProcess);
		} catch (error) {
			reject(error);
		}
	});
}

function killElectronProcess(pid?: number): void {
	if (pid === undefined) {
		console.warn('Cannot kill Electron process: PID is undefined');
		return;
	}

	try {
		process.kill(pid, 'SIGTERM');
	} catch (error) {
		console.error(`Failed to kill Electron process (PID: ${pid}):`, error);
	}
}

function onElectronProcessStdout(chunk: Uint8Array): void {
	printElectronLog(chunk, 'cyan');
}

function onElectronProcessStderr(chunk: Uint8Array): void {
	printElectronLog(chunk, 'red');
}

function onElectronProcessClose(code: number | null, signal: string | null): void {
	if (code !== null) {
		console.info(`Electron process exited with code: ${code}`);
	} else if (signal !== null) {
		console.info(`Electron process was killed with signal: ${signal}`);
	}
}
