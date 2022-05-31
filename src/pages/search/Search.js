import { projectFirestore } from '../../firebase/config'
import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useTheme } from '../../Hooks/useTheme'

// styles 
import './Search.css'

// components 
import RecipeList from '../../components/RecipeList'

export default function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')

  const [ data, setData ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ isPending, setIsPending ] = useState(false)

  const { mode } = useTheme()

  useEffect(() => {

    setIsPending(true)

    projectFirestore.collection('recipes').where("title", ">=", query).get().then((snapshot) => { 
      let results = []
      if (!snapshot.empty) {
        snapshot.forEach((doc) => { 
          results.push({ id: doc.id, ...doc.data() })
        })
        setData(results)
        setError(null)
        setIsPending(false)
      } else { 
        setError('We did not found any recipe with this title')
        setIsPending(false)
      }
    }).catch( err => {
      setError(err.message)
      setIsPending(false)
    })
  }, [query])



  return (
    <div className={`${mode}`}>
       <h2>Recipes including "{query}"</h2>
       { error && <p className='error'>{error}</p>}
       { isPending && <p className='loading'>Loading...</p>}
       { data && <RecipeList recipes={data} />}
    </div>
  )
}
