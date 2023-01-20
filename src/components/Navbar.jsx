import React from 'react'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>My chat</span>
      <div className="user">
        <img src="" alt="" />
        <span>John</span>
        <button>Logout</button>
      </div>
    </div>
  )
}
