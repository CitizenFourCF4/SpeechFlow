import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './styles.module.css'
import { useDispatch } from 'react-redux';
import { setIsShowChatSetupModal } from 'src/app/store/slices/chatSlice';

const SetupElement = () => {
  const dispatch = useDispatch()
  return (
    <div className={styles.setup_wrapper} onClick={() => dispatch(setIsShowChatSetupModal(true))}>   
        <SettingsIcon sx={{ fontSize: 40 }}/>
    </div>
    
  )
}

export default SetupElement