import React, { useEffect, useState } from 'react'

const Sidebar = () => {
    const [users, setusers] = useState([])
    const API_URL=import.meta.env.VITE_API_URL

    useEffect(() => {
      const getUsers = async() => {
        const token = localStorage.getItem('token')
        try {
            const res = await fetch(`${API_URL}/users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()
            setusers(data.users)
        } catch (error) {
            console.error(error)
        }
      }

      getUsers()
    }, [])
    
  return (
    <div className='border w-64 bg-gray-100'>

        {users.map((user) => (
            <div key={user.id} className='border p-4'>
                <h2>{user.username}</h2>
            </div>
        ))}
    </div>
  )
}

export default Sidebar