import React, { useContext, useState } from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { Context } from '../context/Context'
import { UserChat } from './UserChat';
import { handleFoundUserSelect } from '../utils/functions';

export const SearchBar = ({ addNewChat, setSelectedChat }) => {
  const [username, setUsername] = useState('')
  const [err, setErr] = useState(false)
  const { db, auth } = useContext(Context)
  const currentUser = auth.currentUser
  const [foundUsers, setFoundUsers] = useState([])

  const resetFoundUsers = () => {
    setFoundUsers([])
  }

  const resetUserName = () => {
    setUsername('')
  }

  const handleSearch = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("displayName", "==", username.toLowerCase()));
      const querySnapshot = await getDocs(q)
      const users = []
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      })
      setFoundUsers(users)
    } catch (e) {
      console.log(e.message)
      setErr(e)
    }
  }

  const handleKey = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      handleSearch()
    }
  }

  const handleSelect = (foundUser) => {
    handleFoundUserSelect(currentUser, foundUser, db)
    addNewChat(foundUser)
    setSelectedChat(foundUser)
    setFoundUsers([])
    setUsername('')
  }

  return (
    <div className='searchbar'>
      <div className="searchForm">
        <input type="text" placeholder='Find a user'
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={handleKey} />
      </div>
      {err && <span>{err.message}</span>}
      {foundUsers
        ? (
          <div className='foundUsers'>
            {foundUsers.map(foundUser => {
              if (foundUser.uid === currentUser.uid) {
                return
              }

              return <UserChat key={foundUser.uid}
                user={foundUser}
                resetFoundUsers={resetFoundUsers}
                resetUserName={resetUserName}
                addNewChat={addNewChat}
                onClick={() => handleSelect(foundUser)}
              />
            })}
          </div>
        )
        : <></>}
    </div>
  )
}
