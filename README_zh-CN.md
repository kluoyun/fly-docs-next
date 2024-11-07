# FLY Klipper Docs next

**[[English]](README.md)** | **[中文]**

- 这是 Fly 的 Klipper 相关文档。

## 本地部署

<details>

<summary>Windows环境安装及部署</summary>

1. Git 环境安装

   - 下载并安装 [[Git]](https://git-scm.com/downloads/win)

2. Nodejs 环境安装

   - 下载及安装指导 [[Node.js]](https://nodejs.org/zh-cn/download/prebuilt-installer)
   - 可参考 [[runoob nodejs install]](https://www.runoob.com/nodejs/nodejs-install-setup.html)
   - 安装完成后，使用管理员权限打开 Powershell，执行以下的命令
     ```PowerShell
     set-ExecutionPolicy RemoteSigned
     ```
   - 提示是否要更改执行策略?输入`Y`回车确认
   - 打开一个新的终端，输入以下命令测试安装是否成功
     ```PowerShell
     node -v
     npm -v
     ```
   - 如果两条命令都没有报错，说明环境安装成功。

3. 拉取当前文档

   - 打开文件资源管理器，找到想要存放文档的文件夹(需要 6GB 以上空闲空间)，右键点击，选择“在终端中打开”
   - 输入以下命令，拉取仓库
     ```PowerShell
     git clone https://github.com/kluoyun/fly-docs-next.git
     ```
   - 确保仓库克隆成功

4. 安装依赖包

   - 在项目根目录下，输入以下命令
     ```PowerShell
     npm config set registry https://registry.npmmirror.com
     npm install -g pnpm
     pnpm install
     ```
   - 所有命令都没有报错则继续后续步骤。
   - 由于 canvas 包编译需要 Windows SDK 环境所以直接手动下载安装预编译包，跳过编译
   - 下载 node-canvas 包的 windows 预编译包，下载地址 [[node-canvas pre]](https://github.com/Automattic/node-canvas/releases/tag/v2.11.2)
   - 将下载的`canvas-v2.11.2-node-v115-win32-unknown-x64.tar.gz`解压，得到`Release`文件夹
   - 将解压出的`Release`文件夹复制到文档目录下`node_modules\.pnpm\canvas@2.11.2\node_modules\canvas\build`文件夹中，复制并替换

5. 编译项目

   - 在项目根目录下，输入以下命令只编译中文文档 (编译所有语言大约需要 15-30 分钟)
     ```PowerShell
     pnpm run build --locale zh-Hants
     ```
   - 如果需要编译完整文档，请使用下面的命令 (将自动依次编译所有语言)
     ```PowerShell
     pnpm run build
     ```
   - 编译命令没有报错则继续后续步骤。

6. 本地实时预览

   - 如果是修改文档并需要实时预览，使用下面的命令
     ```PowerShell
     pnpm run start --host 0.0.0.0 --port 3000
     ```
   - 成功运行会自动打开浏览器，如果不需要自动打开浏览器请在上面的命令尾部加上参数`--no-open`即可，注意使用**空格**分开。
   - 默认预览为中文，其余语言需要添加参数`--locale xx`，例如`--locale en`
   - 注意：实时预览不支持多语言切换的锚链接，如需测试多语言切换请跳过这步，实行下面的`步骤7`

7. 启动本地服务
   - 在继续此步骤之前必须确保已经编译过文档，否则会报错。
   - 如果没有编译请实行前面的`步骤5`。
   - 编译成功后，在项目根目录下，输入以下命令
     ```PowerShell
     pnpm run serve --host 0.0.0.0 --port 3000
     ```
   - 成功运行会自动打开浏览器，如果不需要自动打开浏览器请在上面的命令尾部加上参数`--no-open`即可，注意使用**空格**分开。
   - 注意：本地服务支持多语言切换及完整的环境，与线上无异。具体支持的语言取决于编译时的参数。

</details>

<details>

<summary>Linux环境安装及部署</summary>

> [!NOTE]
> 以下步骤仅适用于 debian 系发行版系统，其他版本可能存在差异，请自行参考。

1. 环境安装

   - 执行以下命令安装依赖包
     ```Bash
     sudo apt-get update
     sudo apt-get install -y git build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
     ```

2. Nodejs 环境安装

   - 下载并安装 [[Node.js]](https://nodejs.org/zh-cn/download/package-manager)
   - 可参考 [[runoob nodejs install]](https://www.runoob.com/nodejs/nodejs-install-setup.html)
   - 安装完成后打开一个新的终端，输入以下命令测试安装是否成功
     ```Bash
     node -v
     npm -v
     ```
   - 如果两条命令都没有报错，说明环境安装成功。

3. 拉取当前文档

   - 打开文件资源管理器，找到想要存放文档的文件夹(需要 6GB 以上空闲空间)，右键点击，选择“在终端中打开”
   - 输入以下命令，拉取仓库
     ```Bash
     git clone https://github.com/kluoyun/fly-docs-next.git
     ```
   - 确保仓库克隆成功

4. 安装依赖包

   - 在项目根目录下，输入以下命令
     ```Bash
     npm config set registry https://registry.npmmirror.com
     npm install -g pnpm
     pnpm install
     ```
   - 所有命令都没有报错则继续后续步骤。

5. 编译项目

   - 在项目根目录下，输入以下命令只编译中文文档 (编译所有语言大约需要 15-30 分钟)
     ```Bash
     pnpm run build --locale zh-Hants
     ```
   - 如果需要编译完整文档，请使用下面的命令 (将自动依次编译所有语言)
     ```Bash
     pnpm run build
     ```
   - 编译命令没有报错则继续后续步骤。

6. 本地实时预览

   - 如果是修改文档并需要实时预览，使用下面的命令
     ```Bash
     pnpm run start --host 0.0.0.0 --port 3000
     ```
   - 成功运行会自动打开浏览器，如果不需要自动打开浏览器请在上面的命令尾部加上参数`--no-open`即可，注意使用**空格**分开。
   - 默认预览为中文，其余语言需要添加参数`--locale xx`，例如`--locale en`
   - 注意：实时预览不支持多语言切换的锚链接，如需测试多语言切换请跳过这步，实行下面的`步骤7`

7. 启动本地服务

   - 在继续此步骤之前必须确保已经编译过文档，否则会报错。
   - 如果没有编译请实行前面的`步骤5`。
   - 编译成功后，在项目根目录下，输入以下命令
     ```Bash
     pnpm run serve --host 0.0.0.0 --port 3000
     ```
   - 成功运行会自动打开浏览器，如果不需要自动打开浏览器请在上面的命令尾部加上参数`--no-open`即可，注意使用**空格**分开。
   - 注意：本地服务支持多语言切换及完整的环境，与线上无异。具体支持的语言取决于编译时的参数。

</details>

<details>

<summary>Docker站点部署</summary>

> [!TIP]
> 此处为静态文档站点部署在 Docker 容器中的部署教程，非开发用 Docker 容器

1. 拉取镜像

   - 执行以下命令拉取镜像，镜像约 6GB 左右。
     ```Bash
     docker pull ghcr.io/kluoyun/fly-docs-next:latest
     ```
   - 拉取镜像需要一段时间，请耐心等待。

2. 创建并运行容器

   - 执行以下命令创建并运行容器
     ```Bash
     docker run -d -it --name fly-docs-next -p 3000:80 ghcr.io/kluoyun/fly-docs-next:latest
     ```

</details>

---

## 多语言翻译支持情况

> [!TIP]
> 本站除中文和日文外大部分内容均由 AI 生成，请注意代码和配置文件的正确性。

| **CODE** | **Language**       | _Status_                                                                                                                          | **Maintainer**                                                                                                    |
| :------: | :----------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------- |
|   ALL    | **Entire project** | [![gitlocalized ](https://gitlocalize.com/repo/9688/whole_project/badge.svg)](https://gitlocalize.com/repo/9688?utm_source=badge) | ALL                                                                                                               |
|    EN    | **English**        | [![gitlocalized ](https://gitlocalize.com/repo/9688/en/badge.svg)](https://gitlocalize.com/repo/9688/en?utm_source=badge)         | AI                                                                                                                |
|    JA    | **日本語**         | [![gitlocalized ](https://gitlocalize.com/repo/9688/ja/badge.svg)](https://gitlocalize.com/repo/9688/ja?utm_source=badge)         | <a href="https://github.com/Psych0h3ad"><img src="https://github.com/Psych0h3ad.png" width="20" height="20"/></a> |
|    FR    | **Français**       | [![gitlocalized ](https://gitlocalize.com/repo/9688/fr/badge.svg)](https://gitlocalize.com/repo/9688/fr?utm_source=badge)         |                                                                                                                   |
|    DE    | **Deutsch**        | [![gitlocalized ](https://gitlocalize.com/repo/9688/de/badge.svg)](https://gitlocalize.com/repo/9688/de?utm_source=badge)         |                                                                                                                   |
|    RU    | **Русский**        | [![gitlocalized ](https://gitlocalize.com/repo/9688/ru/badge.svg)](https://gitlocalize.com/repo/9688/ru?utm_source=badge)         |                                                                                                                   |
|    KO    | **한국어**         | [![gitlocalized ](https://gitlocalize.com/repo/9688/ko/badge.svg)](https://gitlocalize.com/repo/9688/ko?utm_source=badge)         |                                                                                                                   |
