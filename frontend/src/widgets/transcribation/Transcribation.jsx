import React from 'react'
import styles from './styles.module.css'
import { useSelector } from 'react-redux';
import { selectTranscribation } from 'src/app/store/slices/waveSurferSlice';
import OnlineTranscription from 'src/entities/onlineTrancription/OnlineTranscription';

const Transcribation = () => {
  const transcriptions = useSelector(selectTranscribation)
  return (
    <div className={styles.container}>
      <p className={styles.header}>Транскрибирование - онлайн</p>
      
      <div className={styles.text_wrapper} >
        {!transcriptions.length 
          ? <OnlineTranscription />
          : (<div contentEditable={true} >transcriptions.join(' ')</div>)
        }
      </div>

    </div>
  )
}

export default Transcribation