import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState }  from 'react';


function myPosts(){


    const [posts, setPosts] = useState();



    const token = sessionStorage.getItem('token')
        setToken(token)
        fetch('http://127.0.0.1:8081/verifyToken', {
            headers: {
            'jwt-token': token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                fetch("http://127.0.0.1:8081/getPosts", {
                    method:'GET',
                    body: data.username,
                    headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
                })
                .then(res => res.json())
                .then(data => setPosts(data));
            });

            posts.map((item, index) => <CastItem key={index} />)

    return (
        <div>
            <h2>MyPosts</h2>
        </div>
    );
}