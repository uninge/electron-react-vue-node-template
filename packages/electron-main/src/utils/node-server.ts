import { fork, ChildProcess } from 'node:child_process';
import electronLog from 'electron-log';

let nodeServerProcess: ChildProcess | null = null;

export async function startNodeServer(serverPath: string, isDevelopment: boolean): Promise<void> {
	return new Promise((resolve, reject) => {
		try {
			nodeServerProcess = fork(serverPath, [], {
				stdio: ['inherit', 'pipe', 'pipe', 'ipc'],
				env: {
					...process.env,
					NODE_ENV: isDevelopment ? 'development' : 'production',
				},
			});

			nodeServerProcess.stdout?.on('data', (data) => {
				electronLog.info('[Node Server]', data.toString());
			});

			nodeServerProcess.stderr?.on('data', (data) => {
				electronLog.error('[Node Server Error]', data.toString());
			});

			nodeServerProcess.on('error', (error) => {
				electronLog.error('[Node Server Process Error]', error);
				reject(error);
			});

			nodeServerProcess.on('close', (code) => {
				electronLog.info(`[Node Server] Process exited with code ${code}`);
				nodeServerProcess = null;
			});

			setTimeout(() => {
				resolve();
			}, 1000);
		} catch (error) {
			electronLog.error('[Node Server] Failed to start', error);
			reject(error);
		}
	});
}

export function stopNodeServer(): void {
	if (nodeServerProcess) {
		electronLog.info('[Node Server] Stopping...');
		nodeServerProcess.kill();
		nodeServerProcess = null;
	}
}
