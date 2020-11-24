import './App.css'
import 'tachyons'
import Register from './components/Register'
import Login from './components/Login'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Blog from './components/Blog'
import { useLocalStorage } from './hooks'

function App () {
  const [auth, setAuth] = useLocalStorage('blog_auth', null)

  return (
    <Router>
      <div className='App pv3 ph2 mw8 center bg-light-blue'>

        {auth && (
          <div>
            <span>Logged in as {auth.username}</span> | <button onClick={() => setAuth(null)}>Log out</button>
          </div>
        )}

        <Switch>
          <Route path='/signup'>
            <Register
              auth={auth}
              onRegister={setAuth}
            />
          </Route>
          <Route path='/login'>
            <Login
              auth={auth}
              onLogin={setAuth}
            />
          </Route>
          <Route path='/'>
            <Blog auth={auth} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
