import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'


const EditProfile = () => {
    const token = localStorage.getItem('token')
    const API_URL = import.meta.env.VITE_API_URL
    // const [user, setUser] = useState({})
    const [username, setUsername] = useState('')
    const navigate = useNavigate()

    
    useEffect(() => {
        const getUser = async () => {
        try {
            const res = await fetch(`${API_URL}/users/profile`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            const data = await res.json()
            setUsername(data.user.username)
        } catch (error) {
            console.error(error)
        }
        }

        getUser()
    }, [])

    const editProfile = async () => {
        console.log(username)
        try {
            const res = await fetch(`${API_URL}/users/edit-profile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    username: username
                })
            })

            navigate('/profile')
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div className='p-3'>
        <h1 className='text-2xl font-semibold'>Edit Profile</h1>
        

        <div className='flex items-center gap-3'>
            <h2 className='text-lg'>Username:</h2>
            <input
                type="text"
                name="username"
                id="username"
                value={username}
                className='border p-1 rounded'
                placeholder='Enter your username'
                onChange={(e) => setUsername(e.target.value)} />
        </div>

        <button className='border p-2 mt-3 rounded cursor-pointer bg-blue-500 text-white' onClick={editProfile}>Save Changes</button>


    </div>
  )
}

export default EditProfile