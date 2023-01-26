import React from 'react'
import unknown from '../img/unknown.jpeg'

export const UserChat = ({ user, onClick, setSelectedChat }) => {
  const selectHandle = (e) => {
    const chats = document.querySelectorAll('.userChat')
    chats.forEach(chat => {
      if (chat.classList.contains('selected'))
        chat.classList.remove('selected')
    })
    e.target.classList.add('selected')
    onClick()
  }

  return (
    <div className="userChat" onClick={(e) => selectHandle(e)}>
      <img src={user.photoURL || unknown} alt={"фото"} />
      <div className="userChatInfo">
        <span className='username'>{user.displayName}</span>
        {user.lastMessage && <span className='lastMessage'>{user.lastMessage}</span>}
      </div>
    </div>
  )
}
