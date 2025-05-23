import React, { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { useDispatch, useSelector } from 'react-redux';
import { selectOnlineTranscription, addTranscription, setOnlineTranscription } from 'src/app/store/slices/onlineSlice';
import styles from './styles.module.css'

const client_entity = new W3CWebSocket('ws://localhost:8001/ws');

const OnlineTranscription = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const mediaRecorder = useRef(null);
  const client = useRef(null)

  const dispatch = useDispatch()
  const transcriptions = useSelector(selectOnlineTranscription)

  client.current = client_entity 

  // Инициализация WebSocket
  useEffect(() => {
    client.current.onmessage = (message) => {
      const data = message.data.toString();
      dispatch(addTranscription(data))
    };
    return () => client.current.close();
  }, []);

  // Запуск записи с интервалом 5 секунд
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm', audioBitsPerSecond:128000});
      mediaRecorder.current = recorder;

      recorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          const buffer = await event.data.arrayBuffer();
          client.current.send(buffer);
        }
      };

      setIsRecording(true);
      recorder.start()
      const id = setInterval(() => {
        recorder.stop()
        recorder.start()
      }, 5000);
      setIntervalId(id)    
      
    } catch (error) {
      console.error('Ошибка доступа к микрофону:', error);
    }
  };

  // Остановка записи
  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      mediaRecorder.current = null;
      setIsRecording(false);
      clearInterval(intervalId);
    }
  };

  const editableRef = useRef(null);
  
  const handleBlur = () => {
    if (editableRef.current) {
      console.log(editableRef.current.innerText)
      dispatch(setOnlineTranscription(editableRef.current.innerText));
    }
  };



  return (
    <div>
      <div className={styles.buttons_wrapper}>
        <button onClick={startRecording} disabled={isRecording} className={styles.button}>
          Начать запись
        </button>
        <button onClick={stopRecording} disabled={!isRecording} className={styles.button}>
          Остановить запись
        </button>
      </div>
      <div className={styles.editable_container}>
        <div className={styles.editable} contenteditable="true" suppressContentEditableWarning={true} onBlur={handleBlur} ref={editableRef}>
          {transcriptions}
        </div>
      </div>
    </div>
  );
}

export default OnlineTranscription