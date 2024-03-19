import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function authentication(creds){
    return fetch("http://127.0.0.1:8081/login", {
            method: 'POST',
            body: JSON.stringify(creds),
            headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
        })
        .then(data => data.json())
}

// function redirectToHomePage(){
//     const history = useHistory();
//     history.push("/home");
// }

function Login({ setToken }, token){

    const history = useHistory();
    const submit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get('username');
        const password = formData.get('password');
        const token = await authentication({
            username,
            password,
        });
        setToken(token);
        if(token != null){
            history.push("/home");
            window.location.reload();
        }
    }
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
                        <button type="submit" className='btn btn-success'>Login</button>
                </form>
            </div>
        </div>
    )
    //}
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
  };

export default Login