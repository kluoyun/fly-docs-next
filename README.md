# FLY Klipper Docs next

**[English]** | **[[中文]](README_zh-CN.md)**

- This is the Klipper-related documentation for Fly.

## Local Deployment

<details>

<summary>Installation and Deployment in Windows Environment</summary>

1. Git Environment Installation

   - Download and install [[Git]](https://git-scm.com/downloads/win)

2. Nodejs Environment Installation

   - Download and installation guide [[Node.js]](https://nodejs.org/zh-cn/download/prebuilt-installer)
   - Refer to [[runoob nodejs install]](https://www.runoob.com/nodejs/nodejs-install-setup.html)
   - After installation, open PowerShell with administrative privileges and execute the following command
     ```PowerShell
     set-ExecutionPolicy RemoteSigned
     ```
   - When prompted whether to change the execution policy, type `Y` and press Enter to confirm.
   - Open a new terminal and enter the following commands to test if the installation was successful
     ```PowerShell
     node -v
     npm -v
     ```
   - If both commands execute without errors, the environment installation is successful.

3. Pull Current Documentation

   - Open File Explorer, find the folder where you want to store the documentation (requires more than 6GB of free space), right-click, and select “Open in Terminal”
   - Enter the following command to clone the repository
     ```PowerShell
     git clone https://github.com/kluoyun/fly-docs-next.git
     ```
   - Ensure that the repository is cloned successfully.

4. Install Dependencies

   - In the project root directory, enter the following command
     ```PowerShell
     npm install -g pnpm
     pnpm install
     ```
   - If all commands execute without errors, continue to the next steps.
   - Since the canvas package requires the Windows SDK environment for compilation, manually download and install the precompiled package, skipping the compilation step.
   - Download the precompiled package for the node-canvas package from [[node-canvas pre]](https://github.com/Automattic/node-canvas/releases/tag/v2.11.2)
   - Extract the downloaded `canvas-v2.11.2-node-v115-win32-unknown-x64.tar.gz` to obtain the `Release` folder.
   - Copy the extracted `Release` folder to the `node_modules\.pnpm\canvas@2.11.2\node_modules\canvas\build` directory under the documentation directory, and replace it.

5. Compile Project

   - In the project root directory, enter the following command to compile only the Chinese documentation (compiling all languages takes approximately 15-30 minutes)
     ```PowerShell
     pnpm run build --locale zh-Hants
     ```
   - If you need to compile the complete documentation, use the following command (which will automatically compile all languages in sequence)
     ```PowerShell
     pnpm run build
     ```
   - If the compilation command executes without errors, continue to the next steps.

6. Local Live Preview

   - If you are modifying the documentation and need real-time preview, use the following command
     ```PowerShell
     pnpm run start --host 0.0.0.0 --port 3000
     ```
   - Successful execution will automatically open a browser. If you do not want the browser to open automatically, add the parameter `--no-open` at the end of the above command, separated by a **space**.
   - The default preview is in Chinese; other languages require adding the parameter `--locale xx`, such as `--locale en`.
   - Note: Real-time preview does not support anchor links for switching between multiple languages. To test multi-language switching, skip this step and proceed to the following `Step 7`.

7. Start Local Service
   - Before continuing with this step, ensure that the documentation has been compiled, otherwise there will be errors.
   - If you have not compiled, please go back to `Step 5`.
   - After successful compilation, in the project root directory, enter the following command
     ```PowerShell
     pnpm run serve --host 0.0.0.0 --port 3000
     ```
   - Successful execution will automatically open a browser. If you do not want the browser to open automatically, add the parameter `--no-open` at the end of the above command, separated by a **space**.
   - Note: The local service supports multi-language switching and a complete environment, identical to the online version. The specific supported languages depend on the parameters during compilation.

</details>

<details>

<summary>Installation and Deployment in Linux Environment</summary>

> [!NOTE]
> The following steps apply only to Debian-based distribution systems; other versions may vary, please refer accordingly.

1. Environment Installation

   - Execute the following commands to install dependencies
     ```Bash
     sudo apt-get update
     sudo apt-get install -y git build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
     ```

2. Nodejs Environment Installation

   - Download and install [[Node.js]](https://nodejs.org/zh-cn/download/package-manager)
   - Refer to [[runoob nodejs install]](https://www.runoob.com/nodejs/nodejs-install-setup.html)
   - After installation, open a new terminal and enter the following commands to test if the installation was successful
     ```Bash
     node -v
     npm -v
     ```
   - If both commands execute without errors, the environment installation is successful.

3. Pull Current Documentation

   - Open File Explorer, find the folder where you want to store the documentation (requires more than 6GB of free space), right-click, and select “Open in Terminal”
   - Enter the following command to clone the repository
     ```Bash
     git clone https://github.com/kluoyun/fly-docs-next.git
     ```
   - Ensure that the repository is cloned successfully.

4. Install Dependencies

   - In the project root directory, enter the following command
     ```Bash
     npm install -g pnpm
     pnpm install
     ```
   - If all commands execute without errors, continue to the next steps.

5. Compile Project

   - In the project root directory, enter the following command to compile only the Chinese documentation (compiling all languages takes approximately 15-30 minutes)
     ```Bash
     pnpm run build --locale zh-Hants
     ```
   - If you need to compile the complete documentation, use the following command (which will automatically compile all languages in sequence)
     ```Bash
     pnpm run build
     ```
   - If the compilation command executes without errors, continue to the next steps.

6. Local Live Preview

   - If you are modifying the documentation and need real-time preview, use the following command
     ```Bash
     pnpm run start --host 0.0.0.0 --port 3000
     ```
   - Successful execution will automatically open a browser. If you do not want the browser to open automatically, add the parameter `--no-open` at the end of the above command, separated by a **space**.
   - The default preview is in Chinese; other languages require adding the parameter `--locale xx`, such as `--locale en`.
   - Note: Real-time preview does not support anchor links for switching between multiple languages. To test multi-language switching, skip this step and proceed to the following `Step 7`.

7. Start Local Service

   - Before continuing with this step, ensure that the documentation has been compiled, otherwise there will be errors.
   - If you have not compiled, please go back to `Step 5`.
   - After successful compilation, in the project root directory, enter the following command
     ```Bash
     pnpm run serve --host 0.0.0.0 --port 3000
     ```
   - Successful execution will automatically open a browser. If you do not want the browser to open automatically, add the parameter `--no-open` at the end of the above command, separated by a **space**.
   - Note: The local service supports multi-language switching and a complete environment, identical to the online version. The specific supported languages depend on the parameters during compilation.

</details>

<details>

<summary>Docker Site Deployment</summary>

> [!TIP]
> The following is a deployment guide for static documentation sites in Docker containers, not for development Docker containers.

1. Pull Image

   - Execute the following command to pull the image, which is approximately 6GB in size.
     ```Bash
     docker pull ghcr.io/kluoyun/fly-docs-next:latest
     ```
   - Pulling the image may take some time, please be patient.

2. Create and Run Container

   - Execute the following command to create and run the container
     ```Bash
     docker run -d -it --name fly-docs-next -p 3000:80 ghcr.io/kluoyun/fly-docs-next:latest
     ```

</details>

---

## Internationalization support status

> [!TIP]
> - The translation content of languages ​​other than Chinese on this site is generated by AI. Please pay attention to the correctness of the code and configuration files.
> - It is recommended to switch to Chinese for viewing the example configuration part. Thank you for your understanding.

