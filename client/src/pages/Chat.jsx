import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ChatHeader from '../components/ChatHeader'
import { SendHorizontal } from 'lucide-react'


const Chat = () => {
    const { id } = useParams()
    const API_URL=import.meta.env.VITE_API_URL
    const [user, setUser] = useState({})
    const [authUser, setAuthUser] = useState({})
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const token = localStorage.getItem('token')

    useEffect(() => {
      const getUser = async () => {
        try {
            const res = await fetch(`${API_URL}/users/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()
            setUser(data.user)
        } catch (error) {
            console.error(error)
        }
      }

      const getAuthUser = async () => {
        try {
            const res = await fetch(`${API_URL}/users/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()
            setAuthUser(data.user)
        } catch (error) {
            console.error(error)
        }
      }

      getUser()
      getAuthUser()
    }, [id])


    const getMessages = async () => {
        try {
            const res = await fetch(`${API_URL}/messages/${authUser.id}/${user.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()
            
            const result = data.messages.map(item => {
                const date = new Date(item.createdAt)

                const hours = String(date.getHours()).padStart(2, '0')
                const minutes = String(date.getMinutes()).padStart(2, '0')

                return { 
                    ...item,
                    time: `${hours}:${minutes}`
                }
            })
            setMessages(result)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if(!user.id || !authUser.id) return

        getMessages()
    }, [user.id, authUser.id])
    

    
    const sendMessage = async () => {
        try {
            const res = await fetch(`${API_URL}/messages/${user.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer: ${token}`
                },
                body: JSON.stringify({
                    message
                })
            })

            const data = await res.json()
            console.log(data)
            getMessages()
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div>
        <ChatHeader userName={user.username}/>
        <div className='p-4'>
            {messages.map((message) => (
                <div key={message.id}>
                    <div className={message.recipientId === authUser.id ? 'text-left' : 'text-right'}>
                        <p>{message.message}</p>
                        <p>{message.time}</p>
                    </div>
                </div>
            ))}
            <div className='flex items-center'>
                <input
                    type="text"
                    name="message"
                    id="message"
                    placeholder='Write your message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className='border p-2 rounded'/>
                <button className='border p-2 rounded-full' onClick={sendMessage}>
                    <SendHorizontal />
                </button>
            </div>
        </div>
    </div>
  )
}

export default Chat