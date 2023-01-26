import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../context/Context'

export const Login = () => {
  const [err, setErr] = useState(false)
  const [userNotFound, setUserNotFound] = useState(false)
  const { auth } = useContext(Context)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target[0].value
    const password = e.target[1].value

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/')
      })
      .catch((e) => {
        if (e.message.match(/user-not-found/)) {
          setUserNotFound(true)
          setErr(false)
        } else {
          setErr(true)
          setUserNotFound(false)
        }
      })
  }

  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className='logo'>Lama chat</span>
        <span className='title'>Log in</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='email' />
          <input type="password" placeholder='Password' />
          <button>Log in</button>
          {err && <p className='loginError'>Wrong password or email</p>}
          {userNotFound && <p className='loginError'>User not found</p>}
          <p>Don't you have an account?  <Link to={`/register`}>Register</Link></p>
        </form>
      </div>
    </div>
  )
}