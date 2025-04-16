import React from 'react'
import styles from './styles.module.css'
import Avatar from '@mui/material/Avatar';

const AvatarComponent = ({author}) => {

  return (
    <Avatar sx={{bgcolor:'inherit'}} author={author} className={styles.avatar}>
        { author === 'chatbot'
      ? <img src="/logo.jpeg" alt="" className={styles.logo}/>
      : <div className={styles.user_avatar}>U</div>
      }
    </Avatar>
  )
}

export default AvatarComponent