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


function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}
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
            {/* <Jumbo text={"Home"} /> */}
          </Route>
          <Route exact path="/login" component={Login}>
            <Jumbo text={"Log in"} />
          </Route>
          <Route exact path="/register" component={Register}>
            <Jumbo text={"Register"} />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
