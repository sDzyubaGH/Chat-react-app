import React, { useState } from 'react'
import { Chat } from '../components/Chat'
import { Sidebar } from '../components/Sidebar'

export const Home = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  return (
    <div className='home'>
      <div className="container">
        <Sidebar setSelectedChat={setSelectedChat} />
        <Chat selectedChat={selectedChat} />
      </div>
    </div>
  )
}
