import { globalShortcut } from 'electron';
import electronLog from 'electron-log';

export function banShortcut() {
  const banArray = ['F5', 'CommandOrControl+R', 'CommandOrControl+Shift+R'];

  globalShortcut.registerAll(banArray, () => {
    electronLog.warn('快捷键点击');
    return false;
  });
}
