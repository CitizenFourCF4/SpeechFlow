import React, { useContext } from 'react'
import { BsFillFastForwardFill, BsFillPauseFill, BsFillRewindFill, BsFillPlayFill } from "react-icons/bs"
import styles from './styles.module.css'
import { formatTime } from 'src/utils/helpers'
import WavesurferContext from 'src/app/context/WavesurferContext';

const AudioWave = () => {

  const contextData = useContext(WavesurferContext)

  return (
    <>
      <div style={{display:'flex', flexDirection:'column', width:'100%', position: 'relative'}}>
        <div className={styles.lead_string}>
          <div>{formatTime(contextData.currentTime)}/{formatTime(contextData.audioDuration)}</div>
          <div className={styles.lead_buttons}>
            <button onClick={() => contextData.seek(0)}>
              <BsFillRewindFill />
            </button>
            <button onClick={contextData.onPlayPause} style={{ minWidth: '5em' }}>
              {contextData.isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
            </button>
            <button onClick={() => contextData.seek(contextData.audioDuration)}>
              <BsFillFastForwardFill />
            </button>
          </div>
        </div>
        <div ref={contextData.containerRef} />
      </div>
    </>
  )
}

export default AudioWave