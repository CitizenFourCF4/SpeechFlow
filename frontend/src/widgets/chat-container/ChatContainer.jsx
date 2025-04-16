import React from 'react'
import styles from './styles.module.css'
import TextInputForm from 'src/shared/textInputForm/TextInputForm'
import ChatMessages from 'src/entities/chatMessages/ChatMessages'
import SetupElement from 'src/shared/setup/SetupElement'
import ChatModal from 'src/entities/modals/chatModal/ChatModal'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsShowChatSetupModal, closeChatSetupModal } from 'src/app/store/slices/chatSlice'

const ChatContainer = () => {
  const dispatch = useDispatch()
  const isShowChatSetupModal = useSelector(selectIsShowChatSetupModal)
  const handleModalClose = () => dispatch(closeChatSetupModal())
  

  return (
    <section className={styles.chatbox} >
      <div className={styles.chat_messages_holder}>
        <ChatMessages />
      </div>
      <div className={styles.chat_input_holder}>
        {/* <SwitchElem /> */}
        <TextInputForm />
        <SetupElement />
      </div>
      <ChatModal show={isShowChatSetupModal} onHide={handleModalClose}/>
    </section>
  )
}

export default ChatContainer