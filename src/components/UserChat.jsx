import React from 'react'

export const UserChat = ({ user, onClick, setSelectedChat }) => {
  const selectHandle = (e) => {
    const chats = document.querySelectorAll('.userChat')
    chats.forEach(chat => {
      if (chat.classList.contains('selected'))
        chat.classList.remove('selected')
    })

    e.target.classList.add('selected')
    if (!e.target.classList.contains('selected')) {
      console.log('asdasd')
    }
    onClick()
  }
  return (
    <div className="userChat" onClick={(e) => selectHandle(e)}>
      <img src={user.photoURL} alt="" />
      <div className="userChatInfo">
        <span className='username'>{user.displayName}</span>
        {user.lastMessage && <span className='lastMessage'>{user.lastMessage}</span>}
      </div>
    </div>
  )
}
