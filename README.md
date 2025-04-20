# Yes I Do - 性同意记录应用

一个简单、私密的性同意记录工具，帮助双方明确表达同意意愿，保护双方权益。

## 主要功能

- 📝 明确同意：清晰记录双方同意内容，避免误解和争议
- ✍️ 电子签名：简单便捷的电子签名功能，确认双方意愿
- 🔒 隐私保护：数据本地存储，不上传服务器，保护个人隐私
- 📄 导出记录：支持 PDF 和图片格式导出，方便保存和分享

## 安装与运行

### 依赖安装

项目依赖 `html2canvas` 和 `jspdf` 库实现导出功能。请确保安装了这些依赖：

```bash
# 使用npm
npm install

# 或者专门安装导出功能需要的依赖
npm install html2canvas jspdf
```

### 开发环境运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 重要提示

此应用仅作为沟通和记录工具，不构成法律文件。不同地区法律规定不同，请谨慎使用。

## 导出功能问题解决

如果在使用导出功能时遇到问题：

1. 确保已安装必要的依赖：`html2canvas` 和 `jspdf`
2. 重启开发服务器
3. 清除浏览器缓存后重试

## 隐私声明

所有数据均保存在本地设备上，不会上传到任何服务器。应用不收集任何个人信息。

## 许可

MIT License

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Nightwatch](https://nightwatchjs.org/)

```sh
# When using CI, the project must be built first.
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chrome
npm run test:e2e -- --env chrome
# Runs the tests of a specific file
npm run test:e2e -- tests/e2e/example.ts
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

### Clean

```sh
npm run clean
```
