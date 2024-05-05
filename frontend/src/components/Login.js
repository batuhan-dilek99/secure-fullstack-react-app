import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function authentication(creds){
    let resultData;
    return fetch("http://127.0.0.1:8081/login", {
            method: 'POST',
            body: JSON.stringify(creds),
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
        })
        .then(res => res.json())
        .catch((err) => {console.error(err)})
}




function Login({ setToken }, token){

    const [flag, setFlag] = useState(0);
    const history = useHistory();
    const submit = async e => {
        e.preventDefault();

        //Getting input from form
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        
        //Sending a request to backend and getting a response
        try{
            const auth = await authentication({
                username,
                password,
            });
            console.log(auth);

            //Checking the response coming from backend
            if(!(auth.token == 503 || auth.token == 502 || auth.token == 500)){  //If login is not failed ;
                setToken(auth);  //Store token
                console.log("token : " , auth);
                if(auth != null){
                    setFlag(0); //set flag to render the normal page
                    history.push("/home"); //redirect user after succesfull login
                    window.location.reload(); //reload the page
                }
            }
            else{
                if (auth.token == 501){      //If user fails to fill the form correctly, render a page accordingly
                    setFlag(1);
                }
                else if(auth.token == 503 || auth.token == 502 || auth.token == 500){
                    setFlag(2);                     //If login fails due to invalid credentials, render a page accordingly
                }
            }
        }
        catch(error){
            console.log("Error has been occured");
        }
    }


    if(flag == 0){  //normal login page
        return(
            <div className='d-flex justify-content-center align-items-center'>
                <div className='p-3 bg-white w-25'>
                    <form onSubmit={submit}>
                        <div className='mb-3'>
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder='Enter Email' className='form-control' id="username" name="username"/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Enter password' className='form-control' id="password" name="password"/>
                        </div>
                            <button type="submit" className='btn btn-success w3-deep-purple'>Login</button>
                    </form>
                </div>
            </div>
        )
    }
    //TODO
    //Make this a template, username is taken and invalid username etc
    else if(flag == 2){ //invalid username or password
        return(
            <div className='d-flex justify-content-center align-items-center'>
                <div className='p-3 bg-white w-25'>
                    <p style={{color:"red"}}>Invalid username or password</p>
                    <form onSubmit={submit}>
                        <div className='mb-3'>
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder='Enter Email' className='form-control' id="username" name="username"/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Enter password' className='form-control' id="password" name="password"/>
                        </div>
                            <button type="submit" className='btn btn-success'>Login</button>
                    </form>
                </div>
            </div>
        )
    }
    else{   //Empty form or any other situation
        return(
            <div className='d-flex justify-content-center align-items-center'>
                <div className='p-3 bg-white w-25'>
                    <p style={{color:"red"}}>Please fill the form correctly</p>
                    <form onSubmit={submit}>
                        <div className='mb-3'>
                            <label htmlFor="username">Username</label>
                            <input type="text" placeholder='Enter Email' className='form-control' id="username" name="username"/>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="password">Password</label>
                            <input type="password" placeholder='Enter password' className='form-control' id="password" name="password"/>
                        </div>
                            <button type="submit" className='btn btn-success'>Login</button>
                    </form>
                </div>
            </div>
        )
    }
    //}
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };

export default Login