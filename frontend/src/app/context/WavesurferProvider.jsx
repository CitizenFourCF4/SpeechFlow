import WavesurferContext from "./WavesurferContext";
import { useRef, useCallback } from "react";
import { useWavesurfer } from "@wavesurfer/react";
import { selectAudioUrl } from "../store/slices/waveSurferSlice";
import { useSelector } from "react-redux";

const WavesurferProvider = ({children}) => {

  const containerRef = useRef(null)
  const audioUrl = useSelector(selectAudioUrl)

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    width:780,
    height: 90,
    waveColor: '#999999',
    progressColor: '#494949',
    url: audioUrl,
    dragToSeek: true,
    barHeight:10,
  })  

  const audioDuration = wavesurfer && wavesurfer.getDuration()

  const seek = (seconds) => {
    const newTime = seconds;
    const duration = audioDuration;

    // Перемещаем воспроизведение, если новое время не выходит за пределы
    if (newTime <= duration && newTime >= 0) {
      wavesurfer.seekTo(newTime / duration);
    }
  };

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  const contextData = {
    wavesurfer: wavesurfer,
    isPlaying: isPlaying,
    currentTime: currentTime,
    seek: seek,
    containerRef:containerRef,
    onPlayPause: onPlayPause,
    audioDuration: audioDuration
  }


  return (
    <WavesurferContext.Provider value={contextData}>
      {children}
    </WavesurferContext.Provider>
  )
}

export default WavesurferProvider