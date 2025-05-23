import React from 'react'
import '@fontsource/roboto/500.css';
import { Box, Container } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'
import { useDispatch } from 'react-redux';
import { setChatType } from 'src/app/store/slices/chatSlice';

const LeftSide = () => {
  const dispatch = useDispatch()
  return (
    <div className={styles.wrapper}>
      <div className={styles.paper}>
        <Link to="/offline" style={{ textDecoration: 'none' }} onClick={dispatch(setChatType('offline'))}>
          <div className={styles.circle}>
            <Box component="span" color="white">
              <CloudUploadIcon fontSize='large' />
            </Box>
          </div>
        </Link>
        <span className={styles.header}>
          Upload your file
        </span>
      </div>
    </div>
  )
}

export default LeftSide