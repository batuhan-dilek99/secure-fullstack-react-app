import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
function CreateUser(){

    const [blacklistFlag, setBlacklistFlag] = useState(0);
    const [userCreated, setUserCreated] = useState(0);
    const history = useHistory();
    const submit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target);

        //Input validation for user creation
        const blacklist = ["'", ";", "{", "}", "*", "<", ">", "/"];  //Blacklisting some basic characters.  May include words as well.
        var flag = 0;
        const username = formData.get('username');
        const password = formData.get('password');
        const email = formData.get('email');

        //Checking input for characters which are blacklisted.

        for(let i = 0; i < blacklist.length; i++){
            console.log(blacklist[i]);
            if (username.includes(blacklist[i])){
                flag = 1;
            }
        }
        
        if (!flag){ //If the flag is not set, continue
            setBlacklistFlag(0)
            const data = {
                username: username,
                password: password,
                email: email,
            };
    
    
            fetch('http://127.0.0.1:8081/createuser',{
                method: 'POST',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
            })
            .then(res => res.json())
            setUserCreated(1);
            history.push("/login");
        }
        else{   //set flag
            setBlacklistFlag(1);
        }
    }
    if(userCreated){
        <div className='d-flex justify-content-center align-items-center'>
            <div className='p-3 bg-white w-25'>
                <h2>Your account has been successfully created.</h2>
                <a href='/login'>Go to login page to log in</a>
            </div>
        </div>
    }
    if(blacklistFlag){  //Render a page with an error.
        return (
            <div className='d-flex justify-content-center align-items-center'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={submit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control' id="email" name="email"/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder='Enter username' className='form-control' id="username" name="username"/>
                        <p style={{color:"red"}}>Username cannot contain special characters. A-Za-z0-9</p>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter password' className='form-control' id="password" name="password"/>
                    </div>
                        <button type="submit" className='btn btn-success'>Create Account</button>
                </form>
            </div>
        </div>
        );
    }
    else{       //Render normal page
        return (
            <div className='d-flex justify-content-center align-items-center'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={submit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Enter Email' className='form-control' id="email" name="email"/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="username">Username</label>
                        <input type="text" placeholder='Enter username' className='form-control' id="username" name="username"/>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder='Enter password' className='form-control' id="password" name="password"/>
                    </div>
                        <button type="submit" className='btn btn-success'>Create Account</button>
                </form>
            </div>
        </div>
        );
    }
}

export default CreateUser;