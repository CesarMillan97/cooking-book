import { useFetch } from '../../Hooks/useFetch'
//styles 
import './Home.css'

//components 
import RecipeList from '../../components/RecipeList'

export default function Home() {

  const { data, error, isPending } = useFetch('http://localhost:3000/recipes')

  return (
    <div className='home'>
       { error && <p>{error}</p> }
       { isPending && <p className='loading'>Loading...</p> }
       { data && <RecipeList recipes={data}/>}
    </div>
  )
}
