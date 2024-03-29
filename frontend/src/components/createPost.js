import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState }  from 'react';

function getValue(data, userData, deneme){
    
    userData = data.username;
    console.log("Userdata1 : ", userData);
    deneme = 2;

}

function CreatePost(){

    //const [isSent, setIsSent] = useState();
    // let userData;
    // let username;
    const [token, setToken] = useState('');
    const submit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target);
        const post = formData.get('post');

        //Get user data
        
        const token = sessionStorage.getItem('token')
        setToken(token)
        fetch('http://127.0.0.1:8081/verifyToken', {
            headers: {
            'jwt-token': token,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(post);
                const jsonData = {
                    post: post,
                    username: data.username,
                }
                console.log(JSON.stringify(jsonData));
                fetch('http://127.0.0.1:8081/post',{
                    method:'POST',
                    body: JSON.stringify(jsonData),
                    headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
                })
                .then(res => res.json)
            })
    }

    return (
        <div style={{padding:'10px', width:"50%", margin:"auto"}}>
            <h2 style={{padding:'10px', width:"50%", margin:"auto"}}>Post your thoughts</h2>
            <form onSubmit={submit}>
                <textarea style={{width:'1000px', height:'200px'}}placeholder='Write your post here!' className='form-control' id="post" name="post"></textarea>
                <button type='submit' className='btn btn-success'>Post</button>
            </form>
        </div>
    );
}


export default CreatePost;