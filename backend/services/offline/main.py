import torch
import gigaam

from dotenv import load_dotenv
load_dotenv()


def postprocess_asr_model_output(transcription_chunks:list[dict]):
    
    postprocess_data = []

    for record in transcription_chunks:
        start, end = record['boundaries']
        note = {
            "start": start,
            "end": end,
            "text": record["transcription"]
        }
        postprocess_data.append(note)
    return postprocess_data


def transcribe_audio(filepath:str):
    device = 'cuda' if torch.cuda.is_available() else 'cpu'

    model_rnnt = gigaam.load_model(
        "ctc", # ctc | rnnt
        fp16_encoder=True, # GPU only
        device=device,
    )
    print('model was loaded')

    transcribation = model_rnnt.transcribe_longform(filepath)
    print('transcribation completed')
    processed_output = postprocess_asr_model_output(transcribation)
    return processed_output


