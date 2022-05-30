import { Link } from 'react-router-dom'
import { useTheme } from '../Hooks/useTheme'
// styles
import './Navbar.css'

import React from 'react'
import Searchbar from './Searchbar'

export default function Navbar() {
   const { color } = useTheme()

  return (
    <div className='navbar' style={{ background: color }}>
       <nav >
          <Link to='/' className='brand'>
             <h1>Home</h1>
          </Link>
          <Searchbar></Searchbar>
          <Link to='/create' >create</Link>
       </nav>
    </div>
  )
}
