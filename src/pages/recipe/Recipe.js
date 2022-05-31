import { projectFirestore } from '../../firebase/config'
import { useParams } from 'react-router-dom'
import { useTheme } from '../../Hooks/useTheme'
import { useState, useEffect } from 'react'

// styles 
import './Recipe.css'


export default function Recipe() {
  const { id } = useParams()
  const [ data, setData ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ isPending, setIsPending ] = useState(null)

  const { mode } = useTheme()

  const handleClick = () => {
    projectFirestore.collection('recipes').doc(id).update({
      method: 'This is the new method 3.0'
    })
  }

  useEffect(() => {
    setIsPending(true)
    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
      if (doc.exists) {
        setIsPending(false)
        setError(null)
        setData(doc.data())
      } else {
        setError('That recipe does not exist')
        setIsPending(false)
      }
    }, err => {
      setError(err.message)
    })

    return () => unsub()
  },[id])

  return (
    <div className={`recipe ${mode}`}>
       { error && <p className='error'>{error}</p> }
       { isPending && <p className='loading'>Loading...</p> }
       { data && 
        <>
          <h2 className='page-title'>{data.title}</h2>
          <p>Takes {data.cookingTime}</p>
          <ul>
            {data.ingredients.map(ing => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className='method'>{data.method}</p>
          <button onClick={() => handleClick()}>Update me</button>
        </>
       }
    </div>
  )
}
