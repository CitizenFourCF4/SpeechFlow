from flask import request, jsonify, make_response, send_from_directory, Flask
import os
from helpers import generate_random_sequence
from services.offline import transcribe_audio
from flask_cors import CORS
from services.chatbot import reply_to_user

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

media_folder = 'media'
if not os.path.exists(media_folder):
    os.makedirs(media_folder)
app.config['MEDIA_FOLDER'] = media_folder

@app.route("/media_upload", methods=["POST"])
def handle_media_upload():
    request_data = request.files.get('media')
    filename = request_data.filename

    generated_sequence = generate_random_sequence()
    file_extension = os.path.splitext(filename)[1]

    filename = generated_sequence + file_extension
    save_path = os.path.join(app.config['MEDIA_FOLDER'], filename)
    request_data.save(save_path)
    

    full_filepath = os.path.join(os.environ['BACKEND_PATH'], save_path)

    asr_model_output = transcribe_audio(full_filepath)

    return make_response(
        jsonify({
            "asr_model_output": asr_model_output,
            "audio_url": os.path.join('http://localhost:8000/uploads', save_path.lstrip("media/"))
            }), 
        200
    )

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    if os.path.isfile(os.path.join(app.config['MEDIA_FOLDER'], filename)):
        return send_from_directory(app.config['MEDIA_FOLDER'], filename)
    else:
        return "Файл не найден", 400
    

@app.route("/send_message", methods=["POST"])
def send_message():
    data: dict = request.get_json()
    transcription_chunks = data.get('transcriptions', [])
    chatbot_answer = reply_to_user(data['message'], data['isIncludeTranscription'], transcription_chunks)
    return make_response(
        jsonify({
            "message": chatbot_answer,
            "author": 'chatbot'
            }), 
        200
    )

@app.route("/send_rag_file", methods=["POST"])
def send_rag_file():
    print(request.files)
    if 'ragFile' not in request.files:
        return jsonify({'error': 'Нет файла в запросе'}), 400
    file = request.files['ragFile']

    _, file_extension = os.path.splitext(file.filename)
    temp_filename = 'temp' + file_extension

    file_path = os.path.join(app.config['MEDIA_FOLDER'], temp_filename)
    file.save(file_path)

    return jsonify({'message': 'Файл успешно загружен', 'file_path': file_path}), 200


if __name__ == '__main__':
    app.run(host=os.getenv('HOST'), port=int(os.getenv('WSGI_PORT')), debug=True)