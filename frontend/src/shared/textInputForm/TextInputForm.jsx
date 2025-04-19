import React, { useState } from 'react'
import { AiOutlineSend} from "react-icons/ai"
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage } from 'src/app/store/slices/chatSlice'
import { selectTranscribation } from 'src/app/store/slices/waveSurferSlice'
import { selectIsActiveIncludeTranscriptionToggle } from 'src/app/store/slices/chatSlice';

const TextInputForm = () => {

  const dispatch = useDispatch()
  const transcriptions = useSelector(selectTranscribation)
  const isIncludeTranscription = useSelector(selectIsActiveIncludeTranscriptionToggle)
  
  const [inputMessage, setInputMessage] = useState('')
  const sendTextMessageHandler = (e) => {
    e.preventDefault()
    const sendData = {
      message: inputMessage,
      transcriptions: transcriptions,
      isIncludeTranscription: isIncludeTranscription
    }
    if (inputMessage){
      dispatch(sendMessage(sendData))
      setInputMessage('')
    }
    else{
      alert('Нельзя передавать пустое сообщение')
    }
  }

  return (
    <form method='POST' onSubmit={sendTextMessageHandler} style={{width:'100%'}}>
      <div className={styles.chat_input_wrapper}>
        <input placeholder='Type message...' className={styles.chat_input_textarea} onChange={e => setInputMessage(e.target.value)} value={inputMessage}/>
        {
          inputMessage && <button className={styles.chat_input_button}>
          <AiOutlineSend size={25}/>
        </button>
        }
      </div>
    </form>
  )
}

export default TextInputForm