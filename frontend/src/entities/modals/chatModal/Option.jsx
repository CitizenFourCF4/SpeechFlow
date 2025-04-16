import React from 'react'
import SwitchElem from 'src/shared/switch/Switch';
import styles from './styles.module.css'


const Option = ({text}) => {
  return (
    <div className={styles.option_wrapper}>
        <div className={styles.switch_description}>{text}</div>
        <div className={styles.switch_wrapper}>
            <SwitchElem />
        </div>
    </div>
  )
}

export default Option