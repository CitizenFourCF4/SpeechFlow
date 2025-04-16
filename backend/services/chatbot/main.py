import ollama

def reply_to_user(user_prompt:str, transcription_chunks:list=[], model_name='hf.co/yandex/YandexGPT-5-Lite-8B-instruct-GGUF:latest')->str:
    text = " ".join(transcription_chunks)
    if text:
        prompt = f"""{user_prompt}

        Текст: {text}
        """

    else:
        prompt = user_prompt

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