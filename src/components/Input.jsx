import { arrayUnion, doc, Timestamp, updateDoc } from 'firebase/firestore'
import React, { useContext, useState } from 'react'
import { Context } from '../context/Context'
import attach from '../img/attach.png'
// import img from '../img/img.png'
import { getCombinedId } from '../utils/functions'
import { v4 as uuid } from 'uuid'
import { getDownloadURL, uploadBytesResumable, ref } from 'firebase/storage'

export const Input = ({ selectedChat, addMessage }) => {
  const [text, setText] = useState('')
  const [img, setImg] = useState(null)
  const { db, auth, storage } = useContext(Context)
  const currentUser = auth.currentUser

  const sendMessage = async () => {
    if (!selectedChat || (!img && !text)) {
      return
    }

    const combinedId = getCombinedId(currentUser.uid, selectedChat.uid)
    const m = {
      id: uuid(),
      text,
      senderId: currentUser.uid,
      date: Timestamp.now()
    }
    if (img) {
      const storageRef = ref(storage, uuid())
      const uploadTask = uploadBytesResumable(storageRef, img)
      uploadTask.on(
        (error) => {
          console.log(error)
        },
        () => {
          console.log(img)
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadURL) => {
              m.img = downloadURL
              await updateDoc(doc(db, 'chats', combinedId), {
                messages: arrayUnion(m)
              })
              addMessage(m)
            })
            .catch(e => {
              console.log(e)
            })
        }
      )
    } else {
      try {
        await updateDoc(doc(db, 'chats', combinedId), {
          messages: arrayUnion(m)
        })
        addMessage(m)
      } catch (e) {
        console.log(e)
      }
    }

    setText('')
    setImg(null)
  }

  const keyDownHandle = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      sendMessage()
    }
  }

  return (
    <div className='input'>
      <input onKeyDown={(e) => keyDownHandle(e)} type="text" name="" id="" placeholder='Type something...'
        onChange={(e) => setText(e.target.value)}
        value={text} />
      <div className="send">
        <img src={img} alt="" />
        <input type="file" name="" id="file" onChange={e => setImg(e.target.files[0])} />
        <label htmlFor="file">
          <img src={attach} alt="" />
        </label>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}
