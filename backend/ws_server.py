from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
import gigaam
import torch
import tempfile
from io import BytesIO

from dotenv import load_dotenv
import uvicorn
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

device = torch.device('cuda')
model_audio = gigaam.load_model(
    "ctc", # ctc | rnnt
    fp16_encoder=True, # GPU only
    device=device,
)
print('Модель загружена')

async def process_audio(audio_bytes: bytes):
    with tempfile.NamedTemporaryFile(suffix=".webm", delete=False) as f_webm:
        audio_bytes_io = BytesIO(audio_bytes)
        audio_bytes_io.seek(0)
        f_webm.write(audio_bytes_io.read())
        transcription = model_audio.transcribe_longform(f_webm.name)
    return ' '.join([elem['transcription'] for elem in transcription])

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()    
    try:
        while True:
            audio_bytes = await websocket.receive_bytes()
            print('audio bytes recieved, length:', len(audio_bytes))
            transcription = await process_audio(audio_bytes)
            print("trans ==========> ", transcription)
            await websocket.send_text(transcription)
    except Exception as e:
        print(f"Ошибка: {e}")
    finally:
        await websocket.close()

if __name__ == "__main__":
    uvicorn.run(app, port=8001, reload=False)