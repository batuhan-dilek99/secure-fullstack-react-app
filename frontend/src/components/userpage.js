import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState }  from 'react';


function userPage(){


   useEffect(() =>{

    //const [UID, setUID] = useState();
    const [posts, setPosts] = useState([]);
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const UID = params.get('UID');

    fetch('http://127.0.0.1:8081/userdata', {
        method:'GET',
        body: {UID: UID},
        headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
    })
    .then(res => res.json)
    .then((data) => {
        console.log(data);
    });
   }, []);


    return (
        <div>
            <h2>MyPosts</h2>
        </div>
    );
}


export default userPage;