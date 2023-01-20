import React from 'react'

export const Login = () => {
  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className='logo'>Lama chat</span>
        <span className='title'>Log in</span>
        <form>
          <input type="email" placeholder='email' />
          <input type="password" placeholder='Password' />
          <button>Log in</button>
          <p>Don't you have an account? Register</p>
        </form>
      </div>
    </div>

  )
}
