
import './App.css';
import Login from './components/Login';
import Home from './components/home';
import Index from './components/index';
import CreateUser from './components/createuser';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/navbar';
import React, { useState } from 'react';

function App() {
  const [token, setToken] = useState();

  if(!token){
    return <Login setToken={setToken} />
  }
  return (
    <Router>
      <div >
        <NavigationBar />
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/newAccount">
            <CreateUser />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
