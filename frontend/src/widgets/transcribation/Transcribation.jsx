import React from 'react'
import styles from './styles.module.css'
import OnlineTranscription from 'src/entities/onlineTrancription/OnlineTranscriptionNew';

const Transcribation = () => {
  return (
    <div className={styles.container}>
      <p className={styles.header}>Транскрибирование - онлайн</p>
      <div className={styles.text_wrapper} >
         <OnlineTranscription />
      </div>

    </div>
  )
}

export default Transcribation