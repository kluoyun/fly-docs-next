import json
import threading
import time

# from langdetect import detect, DetectorFactory
import langid
import translators as ts

# 设置随机种子以确保可重复性
# DetectorFactory.seed = 0

SRC_LANG = "zh-Hans"
TARGET_LANGS = ["en", "de", "fr", "ja", "ko", "ru"]

LANG_FILES = [
    "code.json",
    "docusaurus-plugin-content-docs/current.json",
    "docusaurus-theme-classic/footer.json",
    "docusaurus-theme-classic/navbar.json",
]
threads = []


def start_tr(lang: str):
    print(f"处理语言:{lang}")
    for f in LANG_FILES:
        src_file = f"./i18n/{SRC_LANG}/{f}"
        target_file = f"./i18n/{lang}/{f}"
        print(f"{src_file} => {target_file}")
        with open(target_file, "r", encoding="utf-8", errors="ignore") as file:
            try:
                target_json = json.load(file)
            except Exception as e:
                print(f"解析文件失败：{e}")
                break
        with open(src_file, "r", encoding="utf-8", errors="ignore") as file:
            try:
                data = json.load(file)
            except Exception as e:
                print(f"解析文件失败：{e}")
                break
            for key, value in data.items():
                if "message" not in value:
                    continue
                if "description" in value:
                    description = value["description"]
                else:
                    description = None
                # tl = detect(target_json[key]["message"])
                tl, confidence = langid.classify(target_json[key]["message"])
                if (
                    tl == lang
                    or (lang == "en" and tl == "de")
                    or (lang == "de" and tl == "en")
                ):
                    continue
                # else:
                #     print(f"未翻译，识别语言为: {tl}, 相似度: {confidence}")
                while True:
                    try:
                        ts_str = ts.translate_text(
                            value["message"],
                            translator="bing",
                            from_language=str(SRC_LANG),
                            to_language=lang,
                        )
                        if ts_str:
                            break
                    except Exception as e:
                        print(f"翻译失败：{e}, 2秒后重试")
                        time.sleep(2)
                        continue
                print(f"{value['message']} => {ts_str}")
                target_json[key]["message"] = ts_str
                if description and description is not None:
                    target_json[key]["description"] = description
            # save
            with open(target_file, "w", encoding="utf-8") as file:
                json.dump(target_json, file, ensure_ascii=False, indent=4)


for lang in TARGET_LANGS:
    thread = threading.Thread(target=start_tr, args=(lang,))
    threads.append(thread)
    thread.start()

# 等待所有线程完成
for thread in threads:
    thread.join()
