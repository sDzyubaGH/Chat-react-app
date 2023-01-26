import React, { useContext, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { Context } from '../context/Context'
import unknown from '../img/unknown.jpeg'

export const Navbar = () => {
  const { auth } = useContext(Context)
  const currentUser = auth.currentUser

  return (
    <div className='navbar'>
      <span className='logo'>My chat</span>
      <div className="user">
        <img src={currentUser.photoURL || unknown} alt="" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}
