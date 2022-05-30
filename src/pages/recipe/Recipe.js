import { useParams } from 'react-router-dom'
import { useFetch } from '../../Hooks/useFetch'
import { useTheme } from '../../Hooks/useTheme'

// styles 
import './Recipe.css'


export default function Recipe() {
  const { id } = useParams()
  const url = 'http://localhost:3000/recipes/' + id
  const { data, error, isPending } = useFetch(url)
  const { mode } = useTheme()

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
        </>
       }
    </div>
  )
}
