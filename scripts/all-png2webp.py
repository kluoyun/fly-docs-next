import os
import threading
from PIL import Image

from logger import logger

DOCS_DIR = "docs"
IMG_EXTS = [".png", ".jpg", ".jpeg"]
MAX_THREADS = 24


def convert_png_to_webp(png_file_path, webp_file_path):
    with Image.open(png_file_path) as image:
        image.save(webp_file_path, "WEBP")


def task_convert(imgs):
    for img in imgs:
        logger.info(f"开始转换: {img}")
        img_ext = ""
        for ext in IMG_EXTS:
            if img.endswith(ext):
                img_ext = ext
        if img_ext == "":
            continue
        webp_file_path = img.replace(img_ext, ".webp")
        convert_png_to_webp(img, webp_file_path)
        if os.path.exists(webp_file_path):
            logger.info(f"转换成功: {img}")
            os.remove(img)
        else:
            logger.error(f"转换失败: {img}")


def split_list(lst, num_parts):
    """将列表 lst 分成 num_parts 个子列表，允许最后一个子列表大小不同"""
    total_length = len(lst)
    part_size = total_length // num_parts  # 每个子列表的基本大小
    remainder = total_length % num_parts  # 剩余的元素数量

    sub_lists = []
    start_index = 0

    for i in range(num_parts):
        # 计算当前子列表的结束索引
        if i < remainder:
            end_index = start_index + part_size + 1
        else:
            end_index = start_index + part_size

        # 添加子列表
        sub_lists.append(lst[start_index:end_index])

        # 更新起始索引
        start_index = end_index

    return sub_lists


def main():
    # 遍历docs目录中的所有.mdx文件
    img_list = []
    for root, dirs, files in os.walk(DOCS_DIR):
        for file in files:
            is_img = False
            for ext in IMG_EXTS:
                if file.endswith(ext):
                    is_img = True
                    break
            if not is_img:
                continue
            img_list.append(os.path.join(root, file))
            # logger.debug(f"找到文件：{os.path.join(root, file)}")
    if len(img_list) < 1:
        raise logger.error("没有找到图片")

    ts = MAX_THREADS
    if len(img_list) < ts:
        ts = len(img_list)

    threads = []
    slis = split_list(img_list, ts)
    for fl in slis:
        threads.append(threading.Thread(target=task_convert, args=(fl,)))

    for t in threads:
        if t.is_alive():
            continue
        t.start()

    while True:
        for t in threads:
            t.join()
        break


if __name__ == "__main__":
    main()
