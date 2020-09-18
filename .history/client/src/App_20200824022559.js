import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Gears from './components/Gears';
import Nav from './components/Nav';
import Jumbo from './components/Jumbo';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
      </Router>
      <Jumbo text={"Build Maker"} />
      <Gears textPlaceholder={"Head"} />
    </div>
  );
}

export default App;