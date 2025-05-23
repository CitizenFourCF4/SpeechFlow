import React, { useRef } from 'react'
import styles from './styles.module.css'
import Button from '@mui/material/Button';
import { setRagFile, selectRagFile } from 'src/app/store/slices/chatSlice';
import { useDispatch, useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { sendRagFile } from 'src/app/store/slices/chatSlice';

const RAGOption = () => {
  const fileInputRef = useRef(null);
  const dispatch = useDispatch()

  const ragFile = useSelector(selectRagFile)

  const handleClipClick = () => {
    fileInputRef.current.click();
  };

  const handleFileAttach = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('ragFile', file);
    dispatch(setRagFile(file))
    dispatch(sendRagFile(formData))
  };

  return (
    <div className={styles.option_wrapper}>
        <div className={styles.switch_description}>Добавить внешний словарь (RAG)</div>
        <div className={styles.switch_wrapper}>
          <div>
            {ragFile ?
            <div className={styles.rag_file_wrapper}>
              <div>{ragFile.name}</div>
              <DeleteForeverIcon onClick={() => dispatch(setRagFile(null))} className={styles.clear_button}/>
            </div>
            :<>
            <input type="file" name="" id="" ref={fileInputRef} onChange={handleFileAttach} style={{ display: 'none' }} />
            <Button variant="outlined" onClick={handleClipClick}>Выбрать</Button>
            </>
            }
          </div>
        </div>
    </div>
  )
}

export default RAGOption