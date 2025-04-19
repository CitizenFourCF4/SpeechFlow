import React, { useState, useContext } from 'react'
import { formatTime } from 'src/utils/helpers'
import { useSelector, useDispatch } from 'react-redux'
import { selectTranscribation, setTranscriptions } from 'src/app/store/slices/waveSurferSlice'
import styles from './styles.module.css'
import { LiaEditSolid } from "react-icons/lia"
import WavesurferContext from 'src/app/context/WavesurferContext'

const WhisperTranscribation = () => {
  const transcribation = useSelector(selectTranscribation)
  const [selectedRow, setSelectedRow] = useState(null)
  const [editRow, setEditRow] = useState(null)

  const {seek, currentTime} = useContext(WavesurferContext)

  const dispatch = useDispatch()

  const handleInputChange = (index, newValue) => {
    const updatedTranscribation = transcribation.map((msg, idx) => {
      if (idx === index) {
        return { ...msg, text: newValue }
      }
      return msg
    });
    dispatch(setTranscriptions(updatedTranscribation)); 
  };

  return (
    <div className={styles.transcribation_container}>
      {transcribation && transcribation.map((msg, index) => (
        <div key={index} className={`${styles.audio_row} ${((msg.start <= currentTime) & (currentTime < msg.end)) && styles.audio_row_active}`} 
          onClick={() => {seek(msg.start); setSelectedRow(index)}}>
          <div className={styles.formatTime}>
            {formatTime(msg.start)  }
          </div>
          <div className={styles.input_wrapper}>
            <input 
              disabled={(editRow === index) ? false : true} 
              type="text" 
              value={msg.text} 
              className={styles.input}
              onChange={(e) => handleInputChange(index, e.target.value)} />
          </div>
          {((msg.start <= currentTime) & (currentTime < msg.end)) ? <LiaEditSolid style={{marginLeft:'auto'}} size={25} onClick={() => setEditRow(index)}/> : <div/>}
        </div>
      ))}
      </div>
  )
}

export default WhisperTranscribation