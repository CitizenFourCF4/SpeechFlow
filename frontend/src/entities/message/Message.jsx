import React from 'react'
import styles from './styles.module.css'
import AvatarComponent from 'src/shared/avatarComponent/AvatarComponent'

const Message = ({ msg, index }) => {
  return (
    <div className={styles.message_wrapper} key={index} author={msg.author}>
      <div className={styles.icon}>
        <AvatarComponent author={msg.author} />
      </div>
      <div className={styles.message_text}>
        <pre>{msg.message}</pre>
      </div>
    </div>
  )
}

export default Message