import React from 'react'
import Modal from 'react-bootstrap/Modal';
import AudioWave from 'src/shared/audioWave/AudioWave';
import styles from './styles.module.css'
import { useSelector } from 'react-redux';
import { selectTranscribation } from 'src/app/store/slices/waveSurferSlice';
import { CgExport } from "react-icons/cg";
import WhisperTranscribation from 'src/entities/transcribation/WhisperTranscribation';
import { saveAs } from 'file-saver';

const WhisperModal = (props) => {
  const transcribation = useSelector(selectTranscribation)

  const writeFile = () => {
    const data = {
      transcribation: transcribation
    }
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    saveAs(blob, 'data.json');
  }

  return (
    <Modal
      {...props}
      size="lg"
      backdrop='static'
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable
    >
      <Modal.Header closeButton style={{background:'#3f3f3f', color:'white'}}>
        <Modal.Title style={{width:'100%'}}>
          <div style={{display:'flex', alignItems:'center', width:'100%'}}>
            <h4>
              Транскрибирование речи 
            </h4>
            <button className={styles.export_container} onClick={writeFile}>
              <CgExport size={23} style={{marginRight:'.7rem'}}/>
              Export
            </button> 
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{background:'#1d1d1d', color:'white'}}>
          <WhisperTranscribation/>
      </Modal.Body>
      <div style={{height: '1px', backgroundColor: "grey", margin: 0}} />
      <Modal.Footer style={{background:'#1d1d1d', color:'white'}}>
        <AudioWave />
      </Modal.Footer>
    </Modal>
  );
}

export default WhisperModal