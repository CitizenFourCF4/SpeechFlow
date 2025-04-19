import React from 'react'
import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.css'
import Option from './Option';
import RAGOption from './RAGOption';
import Divider from '@mui/material/Divider';


const ChatModal = (props) => {
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
              Настройки параметров чата
            </h4>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{background:'#1d1d1d', color:'white'}}>
        <Option text={'Включать транскрибирование в запрос'} />
          <Divider sx={{marginTop: '1rem', marginBottom: '1rem'}}/>
        <RAGOption />
      </Modal.Body>
      <div style={{height: '1px', backgroundColor: "grey", margin: 0}} />
      <Modal.Footer style={{background:'#1d1d1d', color:'white'}}>
      </Modal.Footer>
    </Modal>
  )
}

export default ChatModal