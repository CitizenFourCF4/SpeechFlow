import WhisperModal from 'src/entities/modals/whisperModal/WhisperModal'
import React, {useState} from 'react'
import { selectIsShowWhisperModal } from 'src/app/store/slices/waveSurferSlice'
import { useDispatch, useSelector } from 'react-redux'
import { closeWhisperModal } from 'src/app/store/slices/waveSurferSlice'
import styles from './styles.module.css'
import WavesurferProvider from 'src/app/context/WavesurferProvider'
import FileUploadNew from 'src/entities/fileUploadNew/FileUploadNew'
import Transcribation from 'src/widgets/transcribation/Transcribation'

const OfflinePage = () => {

  const dispatch = useDispatch();

  const isShowModal = useSelector(selectIsShowWhisperModal)
  // const isTranscribationCompleted = useSelector(selectIsShowWhisperModal)

  const handleModalClose = () => dispatch(closeWhisperModal())


  return (
    <div className={styles.container}>
      {/* {
        isTranscribationCompleted ? <FileUploadNew /> : <Transcribation />
      } */}
      <FileUploadNew />
      
      <WavesurferProvider>
        <WhisperModal show={isShowModal} onHide={handleModalClose}/>
      </WavesurferProvider>
    </div>
  )
}

export default OfflinePage