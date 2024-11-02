import logging

# 日志等级
LOGLEVEL = logging.DEBUG

# 是否保存到文件, 留空不保存
SAVE_TO_FILE = ""


class ColoredFormatter(logging.Formatter):
    COLORS = {
        "DEBUG": "\033[94m",  # 蓝色
        "INFO": "\033[92m",  # 绿色
        "WARNING": "\033[93m",  # 黄色
        "ERROR": "\033[91m",  # 红色
        "CRITICAL": "\033[95m",  # 紫色
    }

    LEVEL_ABBREVIATIONS = {
        "DEBUG": "D",
        "INFO": "I",
        "WARNING": "W",
        "ERROR": "E",
        "CRITICAL": "C",
    }

    RESET_SEQ = "\033[0m"

    def format(self, record):
        levelname = record.levelname
        color = self.COLORS.get(levelname, "")
        level_abbreviation = self.LEVEL_ABBREVIATIONS.get(levelname, levelname)
        message = super().format(record)
        return f"{color}[{level_abbreviation}] ({record.filename}:{record.lineno}) => {message}{self.RESET_SEQ}"


class AbbreviatedFormatter(logging.Formatter):
    LEVEL_ABBREVIATIONS = {
        "DEBUG": "D",
        "INFO": "I",
        "WARNING": "W",
        "ERROR": "E",
        "CRITICAL": "C",
    }

    def format(self, record):
        levelname = record.levelname
        level_abbreviation = self.LEVEL_ABBREVIATIONS.get(levelname, levelname)
        # 调用父类的 format 方法获取原始格式化的日志消息
        message = super().format(record)
        return (
            f"[{level_abbreviation}] ({record.filename}:{record.lineno}) => {message}"
        )


# 配置日志记录器
logger = logging.getLogger(__name__)
logger.setLevel(LOGLEVEL)
# 创建一个格式化器
console_formatter = ColoredFormatter("%(message)s")
file_formatter = AbbreviatedFormatter("%(message)s")


if SAVE_TO_FILE and SAVE_TO_FILE != "":
    # 创建一个文件处理器
    file_handler = logging.FileHandler(SAVE_TO_FILE)
    file_handler.setLevel(LOGLEVEL)
    # 将格式化器添加到处理器
    file_handler.setFormatter(file_formatter)
    # 将处理器添加到日志记录器
    logger.addHandler(file_handler)
else:
    # 创建一个控制台处理器
    console_handler = logging.StreamHandler()
    console_handler.setLevel(LOGLEVEL)
    # 将格式化器添加到处理器
    console_handler.setFormatter(console_formatter)
    # 将处理器添加到日志记录器
    logger.addHandler(console_handler)
