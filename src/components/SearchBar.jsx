import React, { useContext, useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { Context } from '../context/Context'
import { UserChat } from './UserChat';

export const SearchBar = () => {
  const [username, setUsername] = useState('')
  const [err, setErr] = useState(false)
  const [user, setUser] = useState(null)
  const { db } = useContext(Context)
  const [foundUsers, setFoundUsers] = useState([])

  const handleSearch = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", username.toLowerCase()));
      const querySnapshot = await getDocs(q)
      const users = []
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      })
      console.log(users)
      setFoundUsers(users)
    } catch (e) {
      console.log(e.message)
      setErr(e)
    }
  }

  const handleKey = (e) => {
    // setFoundUsers(foundUsers => [])
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      handleSearch()
    }
  }

  return (
    <div className='searchbar'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user'
          onChange={e => setUsername(e.target.value)}
          onKeyDown={handleKey} />
      </div>
      {err && <span>{err.message}</span>}
      {foundUsers
        ? (
          <div className='foundUsers'>
            {foundUsers.map(user => <UserChat key={user.uid} user={user} />)}
          </div>
        )
        : <></>}
    </div>
  )
}
