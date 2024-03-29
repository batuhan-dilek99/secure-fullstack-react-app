import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
//import PropTypes from 'prop-types';
//import verifyToken from '../utils/verifyToken';

function Home(){


    const [userData, setUserData] = useState({});
    const [token, setToken] = useState('');
    useEffect(() => {
        const token = sessionStorage.getItem('token')
        setToken(token)
        console.log(token);
        fetch('http://127.0.0.1:8081/verifyToken', {
            method:'GET',
            headers: {
            'jwt-token': token,
            },
        })
            .then((res) => res.json())
            .then((data) =>  setUserData(data))
        }, []);
        
    if(token){  
        return (
            <div className="home">
                <h2>Homepage</h2>
                <h3>
                    Welcome {userData.username}

                </h3>
            </div>
        );
    }
    else{
        return(
            <div className="home">
                <h2>Must sign in first</h2>
            </div>
        );
    }
}

export default Home;