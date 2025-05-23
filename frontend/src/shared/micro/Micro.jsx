import React from 'react'
import { Box } from '@mui/material';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import '@fontsource/roboto/500.css';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'
import { useDispatch } from 'react-redux';
import { setChatType } from 'src/app/store/slices/chatSlice';

const Micro = () => {
const dispatch = useDispatch()
  return (
    <div className={styles.wrapper}>
      <div className={styles.paper}>
      <Link to="/online" style={{ textDecoration: 'none' }} onClick={dispatch(setChatType('online'))}>
          <div className={styles.circle}>
              <Box component="span" color="common.white">
                  <KeyboardVoiceIcon fontSize='large' />
              </Box>
          </div>
      </Link>
      <span className={styles.header}>
          Transcribe online
      </span>
      </div>
    </div>
    )
}

export default Micro