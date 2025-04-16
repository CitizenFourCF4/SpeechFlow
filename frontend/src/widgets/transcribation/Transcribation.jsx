import React from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux';
import { selectOnlineTranscription } from 'src/app/store/slices/chatSlice';

const Transcribation = () => {
  const transcriptions = useSelector(selectOnlineTranscription)
  return (
    <div className={styles.container}>
      <p className={styles.header}>Транскрибирование - онлайн</p>
      
      <div className={styles.text_wrapper} contentEditable={true}>
        {!transcriptions.length 
          ? <div>Начинайте говорить...</div>
          : transcriptions.join(' ')
        }
      </div>

    </div>
  )
}

export default Transcribation