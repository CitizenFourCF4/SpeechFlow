import React from 'react'
import styles from './styles.module.css'
import WhisperTranscribation from 'src/entities/transcribation/WhisperTranscribation'
import AudioWave from 'src/shared/audioWave/AudioWave'

const OfflineTranscribation = () => {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.transcribation_wrapper}>
                <WhisperTranscribation />
            </div>
            <div className={styles.audiowave_wrapper}>
                <AudioWave />
            </div>
        </div>
    </div>
  )
}

export default OfflineTranscribation