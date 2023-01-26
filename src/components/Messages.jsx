import React from 'react'
import { Message } from './Message'

export const Messages = ({ messages, selectedChat }) => {
  return (
    <div className='messages'>
      {messages?.length
        ? messages.map(message => <Message
          key={message.id}
          message={message}
          selectedChat={selectedChat}
        />)
        : <p>Тут могли быть ваши сообщения</p>}
    </div>
  )
}
