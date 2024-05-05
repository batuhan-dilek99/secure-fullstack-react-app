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
        <div className='w3-row'>
          <div className='w3-col l3'>
            <p></p>
          </div>
          <div className="w3-container w3-card w3-white w3-round w3-margin w3-col l6"><br />
            <div className='w3-row'>
              <div className='w3-col l3'><p></p></div>
              <div className='w3-col l6'>
                <h1 style={{display:'flex',justifyContent:'center',alignItems:'center'}} className='w3-col'>Welcome to TUNITTER</h1>
                <a href="/login" style={{display:'flex',justifyContent:'center',alignItems:'center', paddingRight:'20px'}} className='btn btn-success w3-deep-purple'>Log in</a><br></br><br></br>
                <a href="/newAccount" style={{display:'flex',justifyContent:'center',alignItems:'center'}} className='btn btn-success w3-deep-purple'>Create a new account</a><br></br>
              </div>
              <div className='w3-col l3'></div>
            </div>
          </div>
          <div className='w3-col l3'>
          </div>    
        </div>
  
    );
    }
}

Index.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default Index;