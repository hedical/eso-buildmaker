import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Gears from './components/Gears';
import Nav from './components/Nav';
import Jumbo from './components/Jumbo';
import Signup from './components/Signup';
import Home from './components/pages/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserContext from './context/UserContext'
import Builds from "./components/pages/Builds"
import axios from 'axios'


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })


  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = ""
      }
      const tokenResponse = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } })

      if (tokenResponse.data) {
        const userResponse = await axios.get("http://localhost:5000/users",
          { headers: { "x-auth-token": token } })
        setUserData({
          token,
          user: userResponse.data,
        })
      }
    }
    checkLoggedIn();
  }, [])

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Nav />
          <Switch>
            <Route exact path="/signup">
              <Jumbo text={"Signup"} />
              <Signup />
            </Route>
            <Route exact path="/build">
              <Jumbo text={"Build Maker"} />
              <Gears textPlaceholder={"Head"} />
            </Route>
            <Route exact path="/" component={Home}>
              <Jumbo text={"Home"} />
            </Route>
            <Route exact path="/login" component={Login}>
              {/* <Jumbo text={"Log in"} /> */}
            </Route>
            <Route exact path="/register" component={Register}>
              {/* <Jumbo text={"Register"} /> */}
            </Route>
          </Switch>
        </UserContext.Provider>
      </Router>

    </div>
  );
}

export default App;
