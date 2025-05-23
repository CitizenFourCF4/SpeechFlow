from bm_25 import get_bm25_top_k_candidates
from parser import parse_word_document

def get_rag_candidates(query:str)->list[str]:
    