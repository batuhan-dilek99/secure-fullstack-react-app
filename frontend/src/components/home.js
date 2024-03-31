import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
//import PropTypes from 'prop-types';
//import verifyToken from '../utils/verifyToken';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useNavigate } from 'react-router';



function Home(){

    const navigate = useNavigate();

    const handleClick = (UID) => {
        console.log(UID);
        //navigate("/userpage?UID=" + UID);
    }
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState('');
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const token = sessionStorage.getItem('token')
        setToken(token)
        fetch('http://127.0.0.1:8081/verifyToken', {
            method:'GET',
            headers: {
            'jwt-token': token,
            },
        })
            .then((res) => res.json())
            .then((data) =>  setUserData(data))
        }, []);

    useEffect(() => {
        fetch('http://127.0.0.1:8081/getAllPosts', {
            method:'GET',
        })
        .then(res => res.json())
        .then(data => {
            setPosts(data);
        })
    });
    
    if(token){  
        return (
            <div className="home">
                <h2>Homepage</h2>
                <h3>
                    Welcome {userData.username}
                </h3>
                
                <tbody>
                    {posts.map((item, index) => (
                        <div style={{border:"solid"}}>
                            <p key={index} onClick={handleClick(item.UID)}>{item.username}</p>
                            <p key={index}>{item.content}</p>
                        </div>    
                    ))}
                </tbody>
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