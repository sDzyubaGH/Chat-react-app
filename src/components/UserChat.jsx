import { getDocs } from 'firebase/firestore'
import React, { useContext } from 'react'
import { Context } from '../context/Context'

export const UserChat = ({ user }) => {
  const { auth } = useContext(Context)
  const currentUser = auth.currentUser

  const handleSelect = async () => {
    // const combinedId = currentUser.uid > 
    // const res = await getDocs()
  }

  return (
    <div className="userChat" onClick={handleSelect}>
      <img src={user.photoURL} alt="" />
      <div className="userChatInfo">
        <span>{user.username}</span>
      </div>
    </div>
  )
}
