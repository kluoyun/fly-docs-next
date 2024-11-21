import os
from logger import logger

DOCS_DIR = "docs"


def main():
    # 遍历docs目录中的所有.mdx文件
    src_mdx_list = []
    for root, dirs, files in os.walk(DOCS_DIR):
        for file in files:
            if not file.endswith(".mdx"):
                continue
            src_mdx_list.append(os.path.join(root, file))
            logger.debug(f"找到文件: {os.path.join(root, file)}")
    if len(src_mdx_list) < 1:
        raise logger.error("没有找到.mdx文件")

    while True:
        for mdx_file in src_mdx_list:
            with open(mdx_file, "r", encoding="utf-8") as f:
                content = f.read()
            if "image={require('./" in content:
                directory_path = os.path.dirname(mdx_file)
                directory_path = directory_path.replace(os.sep, "/")
                directory_path = directory_path.replace("docs/", "@site/docs/")
                logger.info(f"正在处理文件: {mdx_file} => {directory_path}")

                content = content.replace(
                    "image={require('./", f"image={{require('{directory_path}/"
                )
                # logger.debug(content)
                with open(mdx_file, "w", encoding="utf-8") as file:
                    file.write(content)
        logger.info("处理完成")
        return


if __name__ == "__main__":
    main()
