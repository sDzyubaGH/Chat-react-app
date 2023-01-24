import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useContext, useState } from 'react'
// import { auth, storage, db } from '../firebase'
import { ref, uploadBytesResumable, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { Context } from '../context/Context';

export const Register = () => {
  const { storage, auth, db } = useContext(Context)
  const [error, setError] = useState(false)
  const [fileUploadProgress, setFileUploadProgress] = useState(0)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const username = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value
    const file = e.target[3].files[0]

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      const storageRef = ref(storage, 'images/' + username)

      await uploadBytesResumable(storageRef, file)
        .then(() => {
          getDownloadURL(storageRef)
            .then(async (downloadURL) => {
              try {
                //Update profile
                await updateProfile(res.user, {
                  displayName: username,
                  photoURL: downloadURL,
                });
                //create user on firestore
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  username,
                  email,
                  photoURL: downloadURL,
                });

                //create empty user chats on firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
                navigate("/");
              } catch (err) {
                console.log(err);
                setError(true);
                // setLoading(false);
              }
            })
        })
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <div className='formContainer'>
      <div className="formWrapper">
        <span className='logo'>Lama chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Name' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='Password' />
          <input type="file" id='file' />
          <label htmlFor="file">
            Add avatar
          </label>
          <button>Sign up</button>
          {error && <span>Something went wrong  </span>}
          <p>Do you have an account? <Link to={`/login`}>Login</Link></p>
        </form>
      </div>
    </div>
  )
}
