import { Menu, MenuItemConstructorOptions, MenuItem, shell } from 'electron';

const template: (MenuItemConstructorOptions | MenuItem)[] = [
  {
    label: 'Template',
    submenu: [
      { role: 'quit', label: 'Quit' },
      { role: 'about', label: 'About' },
    ],
  },
  {
    label: 'View',
    role: 'window',
    submenu: [
      { role: 'minimize', label: '最小化' },
      { role: 'close', label: '关闭窗口' },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: '帮助文档',
        async click() {
          await shell.openExternal('https://google.com');
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

