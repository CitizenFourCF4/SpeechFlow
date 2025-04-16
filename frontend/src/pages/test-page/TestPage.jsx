import React from 'react'
import styles from './styles.module.css'
import Micro from 'src/shared/micro/Micro'
import LeftSide from 'src/shared/leftSide/LeftSide'

const TestPage = () => {
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <LeftSide/>
            <Micro/>
        </div>
    </div>
  )
}

export default TestPage