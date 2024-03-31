import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState }  from 'react';


function Userpage(){

    //const [UID, setUID] = useState();
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState();
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const UID = params.get('UID');
    console.log("UID: ", UID);
    useEffect(() => {

        fetch('http://127.0.0.1:8081/userdata?UID=' + UID, {
            method:'GET',
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setPosts(data);
            setUsername(data[0].username);
        });
    })


    return (
        <div>
            <h4>User : {username}</h4>
            <tbody>
                    {posts.map((item, index) => (
                        <div style={{border:"solid"}}>
                            
                            <a key={index} href="/userpage?UID=" id="id" onClick={() => {
                                console.log("item ID: ", item.UID); 
                                var url = document.getElementById("id");
                                url.href = "/userpage?UID=" + item.UID;
                            }}>{item.username}</a>
                            <p key={index}>{item.content}</p>
                        </div>    
                    ))}
            </tbody>
        </div>
    );
}


export default Userpage;