import logging
import os
import sys
from typing import List, Tuple
import warnings

from pyannote.audio import Pipeline
import pyaudio
from pydub import AudioSegment
import torch
from dotenv import load_dotenv


import gigaam
from services.online.helpers.functions import write_bytes_to_temporary_file, audiosegment_to_tensor

warnings.simplefilter(action="ignore", category=FutureWarning)
warnings.simplefilter(action="ignore", category=UserWarning)
logging.disable(sys.maxsize)

load_dotenv()


device = torch.device('cuda')
pipeline = Pipeline.from_pretrained("pyannote/voice-activity-detection", use_auth_token=os.environ["HF_TOKEN"]).to(device)
print('Пайплайн загружен')

model_rnnt = gigaam.load_model(
    "ctc", # ctc | rnnt
    fp16_encoder=True, # GPU only
    device=device,
)
print('Модель загружена')


def transcribe_stream(socketio):

    #Hyperparameters
    FORMAT = pyaudio.paInt16  # 16-bit audio
    CHANNELS = 1              # mono
    RATE = 16000              # 44100 (вообще говоря)          
    CHUNK_DURATION = 0.5      # seconds per read
    CHUNK_SIZE = int(RATE * CHUNK_DURATION)  # samples per chunk
    RECORD_SECONDS = 5

    p = pyaudio.PyAudio()

    stream = p.open(
        format=FORMAT,
        channels=CHANNELS,
        rate=RATE,
        input=True,
        frames_per_buffer=CHUNK_SIZE,
    )

    is_current_chunk_interrupted = False
    is_previous_chunk_interrupted = False 
    chunk_ostatok = torch.tensor([])
    while True:
        
        print("Recording a new segment...")
        frames = []
        # Record for RECORD_SECONDS
        for _ in range(0, int(RATE / CHUNK_SIZE * RECORD_SECONDS)):
            data = stream.read(CHUNK_SIZE, exception_on_overflow=False)
            frames.append(data)

        audio_bytes = b"".join(frames)

        # Save the chunk to a temporary WAV file
        tmp_filename = write_bytes_to_temporary_file(audio_bytes)

        audio = AudioSegment(
            audio_bytes,
            frame_rate=RATE,
            sample_width=2, # 2 - для 16 бит
            channels=CHANNELS,
        )

        vad_result = pipeline(tmp_filename)
        os.remove(tmp_filename)

        if len(vad_result) == 0:
            # print("No speech detected in this segment.")
            ...
        else:
            segments: List[torch.Tensor] = []
            boundaries: List[Tuple[float, float]] = []

            for segment, _, _ in vad_result.itertracks(yield_label=True):

                start_ms = int(segment.start * 1000) if round(segment.start, 2) != 0.03 else 0
        
                if round(RECORD_SECONDS - segment.end, 2) == 0.02: # По какой-то причине VAD считает, что активность продолжалась чуть меньше конца чанка
                    end_ms = int(RECORD_SECONDS * 1000) # вручную меняем конец чанка до конца
                    # Специальная обработка места стыка
                    extra_seconds = 1 # сохраним последние 0.3 секунды
                    ostatok_start = int((RECORD_SECONDS-extra_seconds) * 1000)

                    is_current_chunk_interrupted_ = True
                    chunk_ostatok = audiosegment_to_tensor(audio[ostatok_start:end_ms])
                    
                else:
                    end_ms = int(segment.end * 1000)
                    is_current_chunk_interrupted_ = False

                if is_previous_chunk_interrupted:
                    segments.append(
                        torch.concatenate(
                            [chunk_ostatok, audiosegment_to_tensor(audio[start_ms:end_ms])]
                        )
                    )
                else:
                    segments.append(audiosegment_to_tensor(audio[start_ms:end_ms]))

                is_previous_chunk_interrupted = is_current_chunk_interrupted
                boundaries.append((segment.start, segment.end))

            transcription = model_rnnt.transcribe_online(segments, boundaries)
            raw_text = " ".join(elem['transcription'] for elem in transcription)
            print(raw_text)
            socketio.sleep(0.01)
            socketio.emit('response', raw_text)
            socketio.sleep(0.01)