import React, { useState } from 'react'


const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: ""
      })

    const [errors, setErrors] = useState([])
    
    const API_URL=import.meta.env.VITE_API_URL

    
    const handleRegister = async (e) => {
    e.preventDefault()

    const newErrors = []

    if(!formData.username) {
      newErrors.push('Please enter your username.')
    } 
    if(!formData.password) {
      newErrors.push('Please enter your password.')
    }

    if(newErrors.length > 0) {
      setErrors(newErrors)
      return
    }

    try {
        const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
        })

        const data = await res.json()
        localStorage.setItem('token', data.token)
    } catch (error) {
        console.error(error)
    }
    }
  return (
    <div>
        <form onSubmit={handleRegister}>
          <h1 className='text-red-800 text-4xl'>Register</h1>
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
              Register
            </button>

            {errors.map((error, index) => (
              <ul key={index}>
                <li className='text-red-500'>{error}</li>
              </ul>
            ))}
        </form>
    </div>
  )
}

export default Register