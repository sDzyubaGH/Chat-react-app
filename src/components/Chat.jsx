import React from 'react'
import add from "../img/add.png"
import cam from "../img/cam.png"
import more from "../img/more.png"
import { Input } from './Input'
import { Messages } from './Messages'

export const Chat = ({ user }) => {
  return (
    <div className='chat'>
      <div className="chatInfo">
        <span>{user.displayName}</span>
        <div className="chatIcons">
          <img src={cam} alt="" />
          <img src={add} alt="" />
          <img src={more} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}
