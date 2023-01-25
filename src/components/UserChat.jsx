import React from 'react'

export const UserChat = ({ user, onClick }) => {
  return (
    <div className="userChat" onClick={onClick}>
      <img src={user.photoURL} alt="" />
      <div className="userChatInfo">
        <span className='username'>{user.displayName}</span>
        {user.lastMessage && <span className='lastMessage'>{user.lastMessage}</span>}
      </div>
    </div>
  )
}
