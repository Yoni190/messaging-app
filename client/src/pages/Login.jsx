import React, { useState } from 'react'

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleLogin = (e) => {
    e.preventDefault()

    console.log(formData)
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