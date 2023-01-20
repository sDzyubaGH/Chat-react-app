import React from 'react'
import { Navbar } from './Navbar'
import { SearchBar } from './SearchBar'
import { Chats } from './Chats'

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <SearchBar />
      <Chats />
    </div>
  )
}
