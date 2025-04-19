import React from 'react'
import { selectIsShowOfflineWidget } from 'src/app/store/slices/waveSurferSlice'
import { useSelector } from 'react-redux'
import styles from './styles.module.css'
import WavesurferProvider from 'src/app/context/WavesurferProvider'
import FileUploadNew from 'src/entities/fileUploadNew/FileUploadNew'
import OfflineWidget from 'src/widgets/offline-widget/OfflineWidget'

const OfflinePage = () => {

  const isShowOfflineWidget = useSelector(selectIsShowOfflineWidget)

  return (
    <div className={styles.container}>
      {
        isShowOfflineWidget ? (
          <WavesurferProvider>
            <OfflineWidget />
          </WavesurferProvider>
        ) : <FileUploadNew /> 
      }
    </div>
  )
}

export default OfflinePage