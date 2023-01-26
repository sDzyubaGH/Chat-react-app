import React, { useState } from 'react'
import { Navbar } from './Navbar'
import { SearchBar } from './SearchBar'
import { Chats } from './Chats'

export const Sidebar = ({ setSelectedChat }) => {
  const [chats, setChats] = useState([])
  const addNewChat = (newChat) => {
    for (let i = 0; i < chats.length; i++) {
      if (chats[i].uid === newChat.uid) {
        return
      }
    }

    setChats([...chats, newChat])
  }

  const setChatsList = (chats) => {
    setChats(chats)
  }

  return (
    <div className='sidebar'>
      <Navbar />
      <SearchBar
        addNewChat={addNewChat}
        setSelectedChat={setSelectedChat}
      />
      <Chats
        chats={chats}
        setSelectedChat={setSelectedChat}
        setChats={setChatsList}
      />
    </div>
  )
}
