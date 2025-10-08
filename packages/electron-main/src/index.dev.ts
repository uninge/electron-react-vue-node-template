import { app } from 'electron';
import electronLog from 'electron-log';
import electronDebug from 'electron-debug';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
  MOBX_DEVTOOLS,
	VUEJS_DEVTOOLS,
} from 'electron-devtools-installer';
import { mark, performanceStart, performanceEnd } from './utils/performance';

performanceStart();

mark('dev-start');

await app.whenReady();

electronDebug({ showDevTools: true });

/** ************** extensions start *************** */
const results = await Promise.allSettled([
	installExtension(REACT_DEVELOPER_TOOLS),
	installExtension(REDUX_DEVTOOLS),
	installExtension(MOBX_DEVTOOLS),
	installExtension(VUEJS_DEVTOOLS),
]);

results.forEach((result) => {
	if (result.status === 'fulfilled') {
		electronLog.info(`Added Extension: ${result.value}`);
	}
	if (result.status === 'rejected') {
		electronLog.error('An error occurred when added extension: ', result.reason);
	}
});
/** ************** extensions end *************** */

mark('dev-end');

electronLog.info('Dev Ready');

performanceEnd();
