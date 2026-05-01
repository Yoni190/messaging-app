import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../../hooks/useAuth'

const Header = () => {
  const navigate = useNavigate()

  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }
  return (
    <header className='border p-4 flex justify-between'>
        <Link to={'/home'} className='text-2xl'>Messaging App</Link>

        <div className='flex items-center gap-3'>
          <Link to={'/profile'} className='border p-2 rounded bg-blue-500 text-white'>Profile</Link>
          <button className='border p-2 rounded bg-red-500 text-white cursor-pointer' onClick={handleLogout}>Log Out</button>
        </div>
    </header>
  )
}

export default Header