import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'

// Components
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import ThemeSelector from './components/ThemeSelector'
import { useTheme } from './Hooks/useTheme'

function App() {
  const { mode } = useTheme()
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar/>
        <ThemeSelector/>
        <Switch>
          <Route path='/' exact>
            <Home/>
          </Route>
          <Route path='/create' >
            <Create/>
          </Route>
          <Route path='/search' >
            <Search/>
          </Route>
          <Route path='/recipes/:id' >
            <Recipe/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App
