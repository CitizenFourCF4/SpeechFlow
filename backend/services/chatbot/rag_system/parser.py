from docx_parser import DocumentParser
from pathlib import Path
from typing import Union

def parse_word_document(doc_path:Union[str, Path])->list:
    sentences = []
    doc = DocumentParser(doc_path)
    for _, item in doc.parse():
        if item['style_id'] != '3':
            sentences.append(item['text'])
    return sentences