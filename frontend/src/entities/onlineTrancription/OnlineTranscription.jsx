import React from 'react'
import MicroCircle from 'src/shared/micro_circle/MicroCircle'
import styles from './styles.module.css'

const OnlineTranscription = () => {
  return (
    <div className={styles.microcircle_wrapper}>
        <MicroCircle />
        <p>Нажмите, чтобы начать запись</p>
    </div>
  )
}

export default OnlineTranscription