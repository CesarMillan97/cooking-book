import { projectFirestore } from '../../firebase/config'
import { useEffect, useState } from 'react'
//styles 
import './Home.css'

//components 
import RecipeList from '../../components/RecipeList'
import { useTheme } from '../../Hooks/useTheme'

export default function Home() {
  const [ data, setData ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ isPending, setIsPending ] = useState(false)
  const { mode } = useTheme()

  useEffect(() => {
    setIsPending(true)
    const unsub = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
      if (snapshot.empty) {
        setError('No recipes to load')
        setIsPending(false)
      } else { 
        let result = []
        snapshot.docs.forEach(doc => {
          result.push({ id: doc.id, ...doc.data() })
        })
        setData(result)
        setIsPending(false)
      }
    }, (err) => { 
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub()
    
  }, [])

  return (
    <div className={`home ${mode}`}>
       { error && <p>{error}</p> }
       { isPending && <p className='loading'>Loading...</p> }
       { data && <RecipeList recipes={data}/>}
    </div>
  )
}
