import React, {useRef, useEffect} from 'react'
import styles from './styles.module.css'
import Message from '../message/Message'
import { useSelector } from 'react-redux';
import { selectOnlineMessages } from 'src/app/store/slices/chatSlice';
import Card from '../card/Card';

const ChatMessages = () => {

    const messages = useSelector(selectOnlineMessages)

    const chatEndRef = useRef(null);
    useEffect(() => {
      // Прокрутка к последнему сообщению
      if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [messages]);
  
  
    return (
      <div className={styles.chat_messages_wrapper}>
        {!messages.length && 
        <div className={styles.card_wrapper}>
          <Card />
        </div>
          
        }
        {messages && messages.map((msg, index) => (
          <Message msg={msg} index={index} key={index}/>
        ))}
        <div ref={chatEndRef}/>
      </div>
    )
}

export default ChatMessages