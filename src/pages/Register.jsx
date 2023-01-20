import React from 'react'

export const Register = () => {
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className='logo'>Lama chat</span>
        <span className='title'>Register</span>
        <form>
          <input type="text" placeholder='Name' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='Password' />
          <input type="file" id='file' />
          <label htmlFor="file">
            Add avatar
          </label>
          <button>Sign up</button>
          <p>Do you have an account? Login</p>
        </form>
      </div>
    </div>
  )
}
