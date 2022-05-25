import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css'

// Components
import Navbar from './components/Navbar'
import Home from './pages/home/Home'
import Create from './pages/create/Create'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
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
