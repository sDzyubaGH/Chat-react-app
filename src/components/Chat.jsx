import { doc, getDoc } from 'firebase/firestore'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { Context } from '../context/Context'
import add from "../img/add.png"
import cam from "../img/cam.png"
import more from "../img/more.png"
import { getCombinedId } from '../utils/functions'
import { Input } from './Input'
import { Messages } from './Messages'

export const Chat = ({ selectedChat }) => {
  const [messages, setMessages] = useState([])
  const { db, auth } = useContext(Context)
  const currentUser = auth.currentUser

  const getMessages = async () => {
    const combinedId = getCombinedId(currentUser.uid, selectedChat.uid)
    const chatsRef = doc(db, 'chats', combinedId)
    const res = getDoc(chatsRef)
    return res
  }

  const addMessage = (m) => {
    setMessages([...messages, m])
  }

  useEffect(() => {
    getMessages()
      .then(data => setMessages(data.data().messages))
      .catch(e => {
        console.log(e)
      })
  }, [selectedChat])



  useEffect(() => {
    const intervalId = setInterval(() => {
      if (selectedChat)
        getMessages()
          .then(data => {
            if (data.data().messages.length !== messages.length) {
              setMessages(data.data().messages)
            }
          })
          .catch(e => {
            console.log(e)
          })
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  })

  useEffect(() => {
    const messages = document.querySelector('.messages')
    // messages[messages.length - 1]?.scrollTo()
    console.log(messages.scrollHeight)
  }, [messages])

  const mobileMenuClickHandle = () => {
    const sidebar = document.querySelector('.sidebar')
    sidebar.classList.toggle('active')
  }

  return (
    <div className='chat'>
      <div className="chatInfo">
        <span className='convUserName'>{selectedChat?.displayName}</span>
        {/* <div className="mobileMenu"> */}
        <button className="mobileMenuBtn" onClick={mobileMenuClickHandle}>Menu</button>
        {/* </div> */}
      </div>
      <Messages selectedChat={selectedChat} messages={messages} />
      <Input addMessage={addMessage} selectedChat={selectedChat} />
    </div>
  )
}
