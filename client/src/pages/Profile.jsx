import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'


const Profile = () => {
    const token = localStorage.getItem('token')
    const API_URL = import.meta.env.VITE_API_URL
    const [user, setUser] = useState({})
    
    useEffect(() => {
      const getUser = async () => {
        try {
            const res = await fetch(`${API_URL}/users/profile`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()

            const date = new Date(data.user.createdAt)
            
            const day = String(date.getDate()).padStart(2, '0')
            const month = String(date.getMonth() + 1).padStart(2, '0')
            const year = date.getFullYear()

            data.user.date = `${day}-${month}-${year}`
            
            setUser(data.user)
        } catch (error) {
            console.error(error)
        }
      }

      getUser()
    }, [])
    

  return (
    <div className='p-3'>
        <div className='flex items-center justify-between'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <Link className='border p-2 rounded bg-blue-500 text-white' to={'/edit-profile'}>Edit Profile</Link>
        </div>
        

        <div className='flex items-center gap-3'>
            <h2 className='text-lg'>Username:</h2>
            <p>{user.username}</p>
        </div>

        <div className='flex items-center gap-3'>
            <h2 className='text-lg'>Joined:</h2>
            <p>{user.date}</p>
        </div>

    </div>
  )
}

export default Profile