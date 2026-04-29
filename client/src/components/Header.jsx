import React from 'react'
import { Link } from 'react-router'

const Header = () => {
  return (
    <header className='border p-4'>
        <Link to={'/home'} className='text-2xl'>Messaging App</Link>
    </header>
  )
}

export default Header