import React, { useEffect } from 'react'
import { io } from 'socket.io-client';
import styles from './styles.module.css'
import ChatContainer from 'src/widgets/chat-container/ChatContainer';
import Transcribation from 'src/widgets/transcribation/Transcribation';
import { useDispatch } from 'react-redux';
import { addTranscription } from 'src/app/store/slices/waveSurferSlice';


const URL = 'http://localhost:8001'

const socket = io(URL, {
  forceNew: true,
  cors: {
    origin: 'http://localhost:5173',
  },
})

const OnlinePage = () => {

  const dispatch = useDispatch()

    useEffect(() => {

      socket.on('connect', () => {
        console.log('Подключено к серверу');
      });

      socket.on('response', (newChunk) => {
        dispatch(addTranscription(newChunk))
      });

      return () => {
          socket.off('response');
          socket.off('connect');
      };
  }, []);

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
          <Transcribation />
          <ChatContainer />
      </div>
    </div>
  )
}

export default OnlinePage