import React from 'react'
import attach from '../img/attach.png'
import img from '../img/img.png'

export const Input = () => {
  return (
    <div className='input'>
      <input type="text" name="" id="" placeholder='Type spmething...' />
      <div className="send">
        <img src={img} alt="" />
        <input type="file" name="" id="file" />
        <label htmlFor="file">
          <img src={attach} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}
