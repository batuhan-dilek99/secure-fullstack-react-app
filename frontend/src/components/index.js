import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


function Index(){

    const [userData, setUserData] = useState({});
    const [token, setToken] = useState('');
    // useEffect(() => {
    //     const token = sessionStorage.getItem('jwt-token')
    //     setToken(token)
    //     fetch('http://127.0.0.1:8081/verifyToken', {
    //       headers: {
    //         'jwt-token': token,
    //       },
    //     })
    //       .then((res) => res.json())
    //       .then((data) => setUserData(data))
    //   }, []);

    console.log(userData);
    if (token){
      return(
        <div>
          <h2>Index page</h2>
          <h3>Hey {userData.username} welcome to index page</h3>
        </div>
      );
    }
    else{
      return (
        <div>
            <h2>Index page</h2>
            <a href="/login">Please log in here</a>
            <a href="/newAccount">Create a new account</a>
        </div>
    );
    }
}

Index.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default Index;