
import './App.css';
import Login from './components/Login';
import Home from './components/home';
import Index from './components/index';
import CreateUser from './components/createuser';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/navbar';
import React from 'react';

function setToken(userToken){
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken(){
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}
function App() {
  const token = getToken();

  return (
    <Router>
      <div >
        <NavigationBar getToken={getToken()}/>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route exact path="/home" render={(props) => token ? <Home /> : <Login setToken={setToken}/>}/>
          <Route exact path="/login">
            <Login setToken={setToken}/>
          </Route>
          <Route exact path="/newAccount" >
            <CreateUser />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
