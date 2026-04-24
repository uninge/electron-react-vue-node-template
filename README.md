# Electron React Vue Node Template

一个基于 Rush monorepo 的现代化 Electron 应用模板，支持 React 和 Vue 双渲染进程。

## ✨ 特性

- 🚀 **现代技术栈**: Electron + React 19 / Vue 3.5 + TypeScript 5.9 + Rspack 2.0
- 📦 **Monorepo 架构**: 使用 Rush 5.175 管理，pnpm 10.33 作为包管理器
- ⚡ **极速构建**: 基于 Rsbuild 2.0 的快速构建工具链
- 🔧 **自定义工具链**: 内置 deveco CLI 工具
- 🎨 **双渲染进程支持**: 同时支持 React 和 Vue 渲染进程
- 🔒 **安全优先**: 内置 Electron 安全最佳实践
- 📊 **性能监控**: 内置性能标记系统
- 🛠️ **开发工具**: 自动安装 React/Vue DevTools

## 📁 项目结构

```
.
├── packages/              # 应用包
│   ├── electron-main/     # Electron 主进程
│   ├── react-render/      # React 渲染进程
│   ├── vue-render/        # Vue 渲染进程
│   └── node-server/       # Node 服务器
├── toolchain/             # 工具链
│   ├── deveco/            # 自定义构建工具
│   ├── rsbuild-electron-dev-plugin/  # Electron 开发插件
│   └── tsconfig/          # 共享 TypeScript 配置
├── common/                # 公共配置
│   └── config/rush/       # Rush 配置文件
└── .github/workflows/     # CI/CD 配置
```

## 🚀 快速开始

### 环境要求

- Node.js >= 20.19.0 或 >= 22.12.0 (不再支持 Node.js 18)
- pnpm 10.33.1 (由 Rush 自动管理)
- Rush 5.175.1

### 安装依赖

```bash
# 安装 Rush
npm install -g @microsoft/rush

# 安装项目依赖
rush update
```

### 开发模式

```bash
# 启动 React 渲染进程开发模式
cd packages/electron-main
rushx start

# 或启动 Vue 渲染进程
# 修改 package.json 中的 CUSTOM_RENDER_PROJECT=vue-render
rushx start
```

### 构建生产版本

```bash
cd packages/electron-main
rushx build

# 打包应用
rushx builder
```

## 🛠️ 开发指南

### 代码规范

项目使用 ESLint + Prettier 进行代码规范检查：

```bash
# 检查代码规范
rushx lint

# 自动修复
rushx lint:fix
```

### 提交规范

建议使用 Conventional Commits 规范：

```
feat: 添加新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式调整
refactor: 代码重构
test: 测试相关
chore: 构建/工具相关
```

### 项目脚本

#### Electron 主进程

- `rushx start` - 启动开发模式
- `rushx build` - 构建生产版本
- `rushx builder` - 打包应用

#### React/Vue 渲染进程

- `rushx start` - 启动开发服务器
- `rushx build` - 构建生产版本

## 📦 构建配置

### 支持平台

- **macOS**: DMG 安装包
- **Windows**: NSIS 安装包 + 便携版
- **Linux**: AppImage + DEB 包

### 构建优化

- ✅ 启用 asar 打包
- ✅ 最大压缩率
- ✅ 自动排除开发依赖
- ✅ 多平台支持

## 🔒 安全特性

- ✅ 启用 `contextIsolation`
- ✅ 启用 `sandbox` 模式
- ✅ 禁用 `nodeIntegration`
- ✅ 启用 `webSecurity`
- ✅ 仅在开发模式打开 DevTools

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 📄 许可证

ISC License

## 👤 作者

**vimalakirti**

- Email: vimalakirti409@gmail.com
- GitHub: [@uninge](https://github.com/uninge)

## 🙏 致谢

- [Electron](https://www.electronjs.org/)
- [React](https://react.dev/)
- [Vue](https://vuejs.org/)
- [Rush](https://rushjs.io/)
- [Rsbuild](https://rsbuild.dev/)
