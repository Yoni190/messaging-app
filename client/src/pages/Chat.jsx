import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ChatHeader from '../components/ChatHeader'


const Chat = () => {
    const { id } = useParams()
    const API_URL=import.meta.env.VITE_API_URL
    const [user, setUser] = useState({})
    const [authUser, setAuthUser] = useState({})
    const [messages, setMessages] = useState([])
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
    }, [])

    useEffect(() => {
        if(!user.id || !authUser.id) return
      
        const getMessages = async () => {
            try {
                const res = await fetch(`${API_URL}/messages/${authUser.id}/${user.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                const data = await res.json()
                setMessages(data.messages)
                console.log(data.messages)
            } catch (error) {
                console.error(error)
            }
        }

        getMessages()
    }, [user.id, authUser.id])
    

    
    
  return (
    <div>
        <ChatHeader userName={user.username}/>
        <div>
            {messages.map((message) => (
                <div key={message.id}>
                    <p className={message.recipientId === authUser.id ? 'text-left' : 'text-right'}>{message.message}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Chat