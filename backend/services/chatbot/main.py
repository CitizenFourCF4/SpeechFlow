import ollama
from typing import Union, List, Dict

def reply_to_user(
        user_prompt:str,
        isIncludeTranscription:bool,
        transcription_chunks:Union[str, Dict],
        model_name='hf.co/yandex/YandexGPT-5-Lite-8B-instruct-GGUF:Q4_K_M'
    )->str:

    if isIncludeTranscription: # Подставить в запрос к LLM историю транскрибирования

        if isinstance(transcription_chunks, str): 
            try: # TODO поменять логику, сейчас ненадежная обработка случаев offline и online
                transcription = transcription_chunks
            except:
                transcription = " ".join(elem['text'] for elem in transcription_chunks)            
        else:
            raise ValueError('Неподдерживаемый тип данных')
        
        if transcription: # Если 
            prompt = f"""{user_prompt}

            Текст с которым нужно работать: {transcription}
            """
        else:
            prompt = user_prompt
    else:
        prompt = user_prompt

    print(f"Итоговый промпт: {prompt}")

    # Отправляем запрос к модели
    response = ollama.chat(
        model=model_name, 
        messages=[{
            'role': 'user',
            'content': prompt,
        }], 
        stream=False, 
        options={'temperature': 0}
    )
    
    return response.message.content