import functools

import numpy as np
import pymorphy2
from rank_bm25 import BM25Okapi
import re

morph = pymorphy2.MorphAnalyzer()

def normalize_sentences(sentence, is_normal_form=False):
    words = re.findall(r'\b[а-яёa-z]+\b', sentence, re.IGNORECASE)
    if is_normal_form:
        normalized_words = []
        for word in words:
            word_normal_form = morph.parse(word)[0].normal_form
            normalized_words.append(word_normal_form)
        processed_text = " ".join(normalized_words).lower()
        return processed_text
    return " ".join(words).lower()


def get_bm25_top_k_candidates(query:str, documents:list[str], top_k:int=10, is_normal_form:bool=True)->list[tuple]:
    partial_normalize = functools.partial(normalize_sentences, is_normal_form=is_normal_form)

    documents = list(map(partial_normalize, documents))
    query = list(map(partial_normalize, query.split()))

    tokenized_docs = [doc.lower().split() for doc in documents]
    bm25 = BM25Okapi(tokenized_docs)

    tokenized_query = query

    # Получение оценок релевантности для каждого документа
    doc_scores = bm25.get_scores(tokenized_query)
    
    sorted_indices = np.argsort(doc_scores)
    top_indices = sorted_indices[-top_k:][::-1]

    return [(documents[elem], doc_scores[elem]) for elem in top_indices]