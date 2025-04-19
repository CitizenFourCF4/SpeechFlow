import React from 'react'
import styles from './styles.module.css'
import Button from '@mui/material/Button';

const RAGOption = () => {
  return (
    <div className={styles.option_wrapper}>
        <div className={styles.switch_description}>Добавить внешний словарь (RAG)</div>
        <div className={styles.switch_wrapper}>
        <Button variant="outlined">Выбрать</Button>
        </div>
    </div>
  )
}

export default RAGOption