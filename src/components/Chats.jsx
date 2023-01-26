import { doc, collection, getDoc, query } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context/Context'
import { Loading } from './Loading'
import { UserChat } from './UserChat'

export const Chats = ({ chats, setChats, setSelectedChat }) => {
  const { db, auth } = useContext(Context)
  const [chatsLoaded, setChatsLoaded] = useState(false)
  const currentUser = auth.currentUser

  const getChats = async () => {
    const chats = []
    try {
      const res = await getDoc(doc(db, 'userChats', currentUser.uid))
      Object.keys(res.data()).map(chat => chats.push(res.data()[chat].userInfo))
    } catch (e) {
      console.log(e.message)
    }
    setChats(chats)
  }

  useEffect(() => {
    setChatsLoaded(false)
    getChats()
    setChatsLoaded(true)
  }, [])

  if (chatsLoaded && chats.length === 0) {
    return (
      <p>Chats not found</p>
    )
  }

  return (
    <div className='user'>
      {chats?.length
        ? chats.map(chat => <UserChat key={chat.uid} user={chat} setSelectedChat={setSelectedChat} onClick={() => {setSelectedChat(chat)}} />)
        : <Loading />}
    </div>
  )
}
