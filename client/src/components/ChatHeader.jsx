import React from 'react'

const ChatHeader = ({ userName }) => {
  return (
    <div className='border p-2'>
        {userName}
    </div>
  )
}

export default ChatHeader