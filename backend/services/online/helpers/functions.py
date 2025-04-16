import torch
import wave
import tempfile
import pyaudio
from pydub import AudioSegment

# Hyperparameters
FORMAT = pyaudio.paInt16  # 16-bit audio
CHANNELS = 1              # mono
RATE = 16000              # sample rate; pyannote expects 16 kHz often, but check specific model requirements
CHUNK_DURATION = 0.5      # seconds per read
CHUNK_SIZE = int(RATE * CHUNK_DURATION)  # samples per chunk
RECORD_SECONDS = 5        # length of each processing window
SAMPLE_WIDTH = 2

def audiosegment_to_tensor(audiosegment: AudioSegment) -> torch.Tensor:
    """
    Converts an AudioSegment object to a PyTorch tensor.
    """
    samples = torch.tensor(audiosegment.get_array_of_samples(), dtype=torch.float32)
    if audiosegment.channels == 2:
        samples = samples.view(-1, 2)

    samples = samples / 32768.0  # Normalize to [-1, 1] range
    return samples

def write_bytes_to_temporary_file(audio_bytes:bytes)->str:
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tmpfile:
        tmp_filename = tmpfile.name
        
        wf = wave.open(tmp_filename, "wb")
        wf.setnchannels(CHANNELS)
        wf.setsampwidth(SAMPLE_WIDTH)
        wf.setframerate(RATE)
        wf.writeframes(audio_bytes)
        wf.close()

    return tmp_filename