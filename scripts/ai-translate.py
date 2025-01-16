import os
import signal
import sys
import threading
import time
from openai import OpenAI
from openai.types.chat_model import ChatModel
from openai.types.chat.chat_completion import ChatCompletion
from openai.types.chat.chat_completion_chunk import ChatCompletionChunk

from logger import logger

DOCS_DIR = "docs"
SRC_LANG = "zh-Hans"
TARGET_LANGS = ["en", "ja", "fr", "ja", "ko"]
I18N_DIR = "i18n"
TRANSLATE_DIR = f"docusaurus-plugin-content-docs{os.sep}current"


class Translater:
    def __init__(self, file_list) -> None:
        self.running = True
        self.file_list = file_list
        self.client = OpenAI(
            api_key="f05de70a-ba57-4cd3-a97e-da59bca2d416",
            base_url="https://ark.cn-beijing.volces.com/api/v3",
        )

    def stop(self) -> None:
        self.running = False

    def translate(self, text: str, src_language: str, target_language: str) -> str:
        sys_prompt = f"""你是一个专业的翻译工具，任务是翻译用户输入的内容。
        源语言为{src_language}，目标语言为{target_language}。请确保翻译结果符合目标语言的语法，并保持原文结构不要做任何修改。

        要求：(重要：你返回的内容只能是翻译结果，不需要添加任何注释或代码块符号)
        1. 翻译结果必须符合目标语言的语法。例如，将中文翻译为英文句子，而不是逐字翻译。
        2. 保持原文结构，包括标题、列表、代码块等。
        3. 保持原文语义，确保代码和公式等内容不变。
        4. 原文中的链接、图片、表格、JSX和Markdown代码需保持原样。
        5. 英文关键字、产品名称和型号等内容应保持原样。
        6. 所有缩进必须保持不变。
        7. 翻译结果尾部需保留或添加一个空行。
        8. 文件路径和链接需保持原样。
        9. 原文中的半角字符保持原样。
        10. 返回结果不要添加前缀或后缀，直接给出翻译结果。
        11. 翻译结果开头和结尾不得添加```.
        12. 保持原文中的空行、换行符、空格和制表符等格式不变。
        13. 翻译结果中不能添加原文中不存在的代码、标签或其他内容，包括但不限于<br>。
        14. 不能修改原文中的空格和制表符。不能替换为非断行空格等。
        15. 绝对不能删除原文中的import语句。
        16. 须严格遵循上述要求，否则翻译结果可能会有误。
        """
        user_prompt = text
        ret = None
        assistant = ""
        err_count = 0
        while True:
            err_count += 1
            if err_count > 2:
                logger.error(f"2次翻译失败，跳过")
                break
            try:
                msg = [
                    {"role": "system", "content": sys_prompt},
                    {"role": "user", "content": user_prompt},
                ]
                if assistant is not None and assistant != "":
                    msg.append({"role": "assistant", "content": assistant})
                    msg.append(
                        {
                            "role": "user",
                            "content": "翻译结果有误，请不要修改原文结构并按照要求重新翻译返回翻译结果。",
                        }
                    )
                completion: ChatCompletion = self.client.chat.completions.create(
                    model="ep-20250116164055-48q6q",
                    messages=msg,
                    timeout=60,
                )
                # logger.debug(completion.model_dump_json())
                if completion.choices[0].finish_reason != "stop":
                    logger.error(f"翻译失败: {completion.choices[0].finish_reason}")
                    logger.debug(
                        f"翻译结果有误：{completion.choices[0].message.content}"
                    )
                    assistant = ""
                    time.sleep(2)
                    continue
                ret = completion.choices[0].message.content
                if ret.startswith("```markdown") and ret.endswith("```"):
                    ret = ret[len("```markdown") + 1 : len(ret) - len("```")]
                if not text.startswith("```") and ret.startswith("```"):
                    logger.debug(f"翻译结果有误：{ret}")
                    assistant = ret
                    ret = None
                    continue
                if text.startswith("---") and not ret.startswith("---"):
                    logger.debug(f"翻译结果有误：{ret}")
                    assistant = ret
                    ret = None
                    continue
                assistant = ""
                break
            except Exception as e:
                logger.error(f"请求LLM失败: {e}")
                assistant = ""
                time.sleep(2)
                continue
        if ret is not None and ret != "":
            return ret
        return None

    def task_translate(self, src_language: str, target_language: str) -> str:
        logger.info(f"开始翻译任务: {src_language} => {target_language}")
        # 遍历文件列表，翻译文件
        tr_file_list = []
        for file in self.file_list:
            if self.running is False:
                break
            target_file = file.replace(
                f"{DOCS_DIR}{os.sep}",
                f"{I18N_DIR}{os.sep}{target_language}{os.sep}{TRANSLATE_DIR}{os.sep}",
            )
            if os.path.exists(target_file):
                # 已存在翻译文件，跳过
                continue
            if file.endswith("cfg.mdx") or file.endswith("voron0.mdx") or file.endswith("voron2.4.mdx"):
                # 暂不翻译cfg，跳过
                continue
            tr_file_list.append({"src_file": file, "target_file": target_file})
        if len(tr_file_list) < 1:
            logger.info("没有需要翻译的文件")
            return
        logger.info(f"需要翻译的文件数: {len(tr_file_list)}")
        tr_count = 0
        for f in tr_file_list:
            file = f["src_file"]
            target_file = f["target_file"]
            try:
                logger.debug(f"翻译文件({src_language} => {target_language}): {file}")
                with open(file, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                if content.strip() == "":
                    logger.error(f"文件为空: {file}")
                    with open(target_file, "w", encoding="utf-8") as f:
                        f.write("")
                    continue
                content = content.replace(
                    "from '@site/docs/",
                    f"from '@site/{I18N_DIR}/{target_language}/docusaurus-plugin-content-docs/current/",
                )
                tr_str = self.translate(content, src_language, target_language)
                if tr_str is not None and tr_str != "":
                    # 确保目标目录存在
                    target_dir = os.path.dirname(target_file)
                    os.makedirs(
                        target_dir, exist_ok=True
                    )  # exist_ok=True 防止已存在目录引发错误
                    tr_str = tr_str.replace(b"\xc2\xa0".decode(), " ")
                    tr_str = tr_str.replace(b"\xe2\x80\x8b".decode(), " ")
                    with open(target_file, "w", encoding="utf-8") as f:
                        f.write(tr_str)
                        tr_count += 1
                        logger.info(
                            f"翻译成功 [{tr_count}/{len(tr_file_list)}]: {target_file}"
                        )
                else:
                    logger.error(f"翻译失败: {file}")
            except Exception as e:
                logger.error(f"翻译失败: {e}")
                continue
        logger.info(f"结束翻译任务: {src_language} => {target_language}")

    def task_replace_link(self, src_language: str, target_language: str):
        logger.info("检查并替换链接")
        target_file_list = []
        for root, dirs, files in os.walk(
            f"{I18N_DIR}{os.sep}{target_language}{os.sep}{TRANSLATE_DIR}{os.sep}"
        ):
            for file in files:
                if not file.endswith(".mdx"):
                    continue
                target_file_list.append(os.path.join(root, file))
                # logger.debug(f"找到文件：{os.path.join(root, file)}")
        if len(target_file_list) < 1:
            raise logger.error("没有找到.mdx文件")
        for target_file in target_file_list:
            with open(target_file, "r", encoding="utf-8") as f:
                content = f.read()
            if content.strip() == "":
                logger.error(f"文件为空: {target_file}")
                continue
            content = content.replace(
                "from '@site/docs/",
                f"from '@site/{I18N_DIR}/{target_language}/docusaurus-plugin-content-docs/current/",
            )
            with open(target_file, "w", encoding="utf-8") as f:
                f.write(content)
        return

    def _handle_interrupt(self, signum, frame):
        self.stop()
        logger.info("正在退出服务...")
        sys.exit(0)


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
    src_mdx_list = []
    for root, dirs, files in os.walk(DOCS_DIR):
        for file in files:
            if not file.endswith(".mdx"):
                continue
            src_mdx_list.append(os.path.join(root, file))
            # logger.debug(f"找到文件：{os.path.join(root, file)}")
    if len(src_mdx_list) < 1:
        raise logger.error("没有找到.mdx文件")
    tr = Translater(src_mdx_list)
    signal.signal(signal.SIGINT, tr._handle_interrupt)  # 注册信号处理函数
    # 每个语言开一个线程
    slis = split_list(src_mdx_list, len(src_mdx_list) // 50)
    for fl in slis:

        tr = Translater(fl)

        # 每个语言开一个线程
        threads = []
        for lang in TARGET_LANGS:
            thread = threading.Thread(target=tr.task_translate, args=(SRC_LANG, lang))
            thread.daemon = True  # 设置为守护线程
            threads.append(thread)
            thread.start()

    while True:
        pass


if __name__ == "__main__":
    main()
