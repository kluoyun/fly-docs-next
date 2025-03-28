import os

def ensure_final_newline(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        if content and not content.endswith('\n'):
            content += '\n'
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(content)
    except Exception as e:
        print(f"Error processing {file_path}: {e}")

def process_mdx_files(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.mdx'):
                file_path = os.path.join(root, file)
                ensure_final_newline(file_path)

if __name__ == "__main__":
    project_directory = '.'
    process_mdx_files(project_directory)
