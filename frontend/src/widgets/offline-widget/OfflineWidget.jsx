import React from 'react'
import styles from './styles.module.css'
import ChatContainer from '../chat-container/ChatContainer'
import OfflineTranscribation from '../offline-transcribation/OfflineTranscribation'

const OfflineWidget = () => {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
          <OfflineTranscribation />
          <ChatContainer />
      </div>
    </div>
  )
}

export default OfflineWidget