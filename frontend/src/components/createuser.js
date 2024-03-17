import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateUser(){

    //const [user, setUser] = useState(null);

    const submit = async e => {
        e.preventDefault()
        const formData = new FormData(e.target);

        const data = {
            username: formData.get('username'),
            password: formData.get('password'),
            email: formData.get('email'),
        };

        // try{
        //     const response = await fetch('http://127.0.0.1:8081/createuser',{
        //         method:'POST',
        //         body: JSON.stringify(data),
        //         header: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
        //         mode:'cors',
        //     });
        //     if(response.ok){
        //         console.log("The account hs been Sucessfully created");
        //     }
        // }catch (error){
        //     console.log("Something went wrong");
        // }

        fetch('http://127.0.0.1:8081/createuser',{
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
        })
        .then(res => res.json())
    }
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

export default CreateUser;