import React, { useContext, useEffect, useRef } from 'react'
import { Context } from '../context/Context'

export const Message = ({ message, selectedChat }) => {
  const { auth } = useContext(Context)
  const currentUser = auth.currentUser

  if (message) {
    let className = ''
    let ownerPhotoURL = ''
    if (message.senderId === currentUser.uid) {
      className = 'message owner'
      ownerPhotoURL = currentUser?.photoURL
    } else {
      className = 'message'
      ownerPhotoURL = selectedChat?.photoURL
    }

    const date = message.date.toDate().toISOString().split('T')[0]
    const time = `${message.date.toDate().getHours()}:${message.date.toDate().getMinutes()}`

    return <div className={className}>
      <div className="messageInfo">
        <img src={ownerPhotoURL} alt="" />
        <span>{date}</span>
        <span>{time}</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  }

  return (
    <></>
  )
}
