
import './App.css';
import Login from './components/Login';
import Home from './components/home';
import Index from './components/index';
import CreateUser from './components/createuser';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavigationBar from './components/navbar';
import React from 'react';
import Userpage from './components/userpage';
import Account from './components/account';
import PageNotFound from './components/404Page';

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
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"></link>
      <link rel="stylesheet" href="https://www.w3schools.com/lib/w3-theme-blue-grey.css"></link>
      <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Open+Sans'></link>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
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
          <Route exact path="/newAccount" render={(props) => token ? <Home /> : <Login setToken={setToken}/>}>
            <CreateUser />
          </Route>
          <Route path="/userpage" render={(props) => token ? <Userpage /> : <Login setToken={setToken}/>}/>
          <Route exact path="/account" render={(props) => token ? <Account /> : <Login setToken={setToken}/>}>
            <Account/>
          </Route>
          <Route path='*'>
            <PageNotFound/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
