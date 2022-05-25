// styles 
import './Searchbar.css'

import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function Searcbar() {
   const [term, setTerm] = useState('')
   const history = useHistory()

   const handleSubmit = (e) => {
      e.preventDefault()

      // query parameter ... ?q=
      history.push(`/search?q=${term}`)
   }
  return (
    <div className='searchbar'>
       <form onSubmit={handleSubmit}>
          <label htmlFor="search">Search</label>
          <input type="text"
          id='search'
          onChange={(e) => setTerm(e.target.value)}
          required
       />
       </form>
    </div>
  )
}
