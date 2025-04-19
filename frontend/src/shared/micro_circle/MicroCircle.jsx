import React from 'react'
import styles from './styles.module.css'
import { TiMicrophoneOutline } from "react-icons/ti";

const MicroCircle = () => {
  return (
    <div className={styles.circle}>
        <TiMicrophoneOutline size={40}/>
    </div>
  )
}

export default MicroCircle