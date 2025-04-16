from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
import os
from services.online.stream_transcription import transcribe_stream

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

media_folder = 'media'
if not os.path.exists(media_folder):
    os.makedirs(media_folder)

app.config['MEDIA_FOLDER'] = media_folder

@socketio.on('connect')
def on_connect():
    print('Произошло соединение с клиентом')
    socketio.start_background_task(target=transcribe_stream, socketio=socketio)

if __name__ == '__main__':
    socketio.run(app, debug=True, host=os.getenv('HOST'), port=int(os.getenv('SOCKET_PORT')), allow_unsafe_werkzeug=True)