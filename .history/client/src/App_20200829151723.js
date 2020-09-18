import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Gears from './components/Gears';
import Nav from './components/Nav';
import Jumbo from './components/Jumbo';
import Signup from './components/Signup';
import Home from './components/pages/Home'
import Login from './components/auth/Login'


function App() {
  return (
    <div className="App">
      <Router>
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
          <Route path="/" component={Home}>
            <Jumbo text={"Home"} />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
