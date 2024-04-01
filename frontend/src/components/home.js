import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';




function Home(){

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
                
                <div style={{paddingLeft:"33%"}}>
                    <tbody>
                        {posts.map((item, index) => (
                            <tr>
                                
                                <div style={{padding:'60px', width:"200%", margin:"auto", border:"solid"}}>
                                    <img src={item.file} style={{width:"50px", height:"50px"}}></img>
                                    <a key={index} href="/userpage?UID=" id={index} style={{paddingLeft:"10px"}}onClick={() => {
                                        var url = document.getElementById(index);
                                        url.href = "/userpage?UID=" + item.UID;
                                    }}>{item.username}</a>
                                    <p key={index}>{item.content}</p>
                                    <p key={index}>{item.created_at}</p>
                                </div>    
                                
                            </tr>
                        ))}
                    </tbody>
                </div>
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