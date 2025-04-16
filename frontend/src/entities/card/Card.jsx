import React from 'react'
import styles from './styles.module.css'
import { FaFilePdf} from "react-icons/fa";
import { AiFillOpenAI } from "react-icons/ai";

const Card = () => {
  return (
    <div className={styles.card} >
        <p className={styles.ai_wrapper}>Начни общение с <span>AI</span> помощником</p>
        <div className={styles.image}>
        <AiFillOpenAI size={25} />
        </div>
    </div>
  )
}

export default Card