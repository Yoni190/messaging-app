import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'


const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const navigate = useNavigate()
  const { login } = useAuth()

  const API_URL=import.meta.env.VITE_API_URL

  
  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      console.log(data.token)
      login(data.token)
      navigate('/home')
    } catch (error) {
      console.error(error)
    }
  }
  
  return (
    <div>
        <form onSubmit={handleLogin}>
          <h1 className='text-red-800 text-4xl'>Login</h1>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder='John Doe'
            className='border p-1'
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}/>

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder='********'
            className='border p-1' 
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}/>

            <button className='border p-1'>
              Login
            </button>
        </form>
    </div>
  )
}

export default Login