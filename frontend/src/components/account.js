import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';


function Account({ setToken }, token){

    var success = 1;

    const submit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let info = {};
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        const profilePicture = formData.get("file");

        console.log(profilePicture.size);
        if(profilePicture.size > 30000){
            window.alert("File size is too large")
            // success = 0;
        }
        else{
            info = {
                username: username,
                email: email,
                password: password,
                file: profilePicture,
                oldusername: "",
            }
            for (var key in info){    //Deleting empty input fields from json
                var value = info[key];
                if(value.length === 0){
                    delete info[key];
                }
                if(key === "file"){
                    if(info[key].size === 0){
                        delete info[key];
                    }
                    else{
                        const reader = new FileReader();
                        reader.readAsDataURL(info[key]);
                        reader.onload = function(a) {
                            info.file = reader.result;
                        }
                    }
                }
            }
    
            const token = sessionStorage.getItem('token');
            fetch('http://127.0.0.1:8081/verifyToken', {
                method:'GET',
                headers: {
                'jwt-token': token,
                },
            })
                .then((res) => res.json())
                .then((data) =>  {
                    console.log(data)
                    info.oldusername = data.username;
                    //info[oldusername] = data.username;
                    fetch('http://127.0.0.1:8081/updateAccount', {
                        method:'POST',
                        body: JSON.stringify(info),
                        headers: {'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" ,"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"},
                    })
                    .then(res => res.json())
                    .then(data => {
                        sessionStorage.setItem('token', JSON.stringify(data));  //Read the new token with new username and store it into browser. 
                    })
                })
                success = 1;
        }

    };
    console.log(success);

    if(success){
        return (
            <div>
                <h1>Manage your account</h1>
                <form onSubmit={submit}>
                    <input type='text' placeholder='New username' name='username' id='username'></input>
                    <input type='text' placeholder='New email' name='email' id='email'></input>
                    <input type='password' placeholder='New password' name='password' id='password'></input>
                    <input type='file' placeholder='New file' name='file' id='file'></input>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
    else {
        return(
            <div>
                <h1>Manage your account</h1>
                {window.alert("An Error has been occured. Please try again.")}
                <form onSubmit={submit}>
                    <input type='text' placeholder='New username' name='username' id='username'></input>
                    <input type='text' placeholder='New email' name='email' id='email'></input>
                    <input type='password' placeholder='New password' name='password' id='password'></input>
                    <input type='file' placeholder='New file' name='file' id='file'></input>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

export default Account;

Account.propTypes = {
    setToken: PropTypes.func.isRequired
  };