/**
 * Yes I Do 应用依赖安装帮助脚本
 *
 * 请按照以下步骤安装必要的依赖：
 *
 * 1. 打开终端/命令提示符
 * 2. 导航到项目根目录
 * 3. 运行以下命令安装导出功能所需的依赖:
 *
 * npm install html2canvas jspdf --legacy-peer-deps
 *
 * 或者使用force参数:
 *
 * npm install html2canvas jspdf --force
 *
 * 或者如果你使用yarn:
 *
 * yarn add html2canvas jspdf
 *
 * 安装完成后，重启应用以确保更改生效。
 *
 * 如果仍然遇到问题，请尝试删除node_modules文件夹和package-lock.json文件，然后重新安装所有依赖:
 *
 * npm install --legacy-peer-deps
 */

console.log("请运行 'npm install html2canvas jspdf --legacy-peer-deps' 安装导出功能所需的依赖")
