import React from 'react'
import styles from './styles.module.css'
import ChatContainer from 'src/widgets/chat-container/ChatContainer';
import Transcribation from 'src/widgets/transcribation/Transcribation';


const OnlinePage = () => {
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