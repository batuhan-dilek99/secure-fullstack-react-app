import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';


function FileUpload(){

    const submit = async e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const file = formData.get("file");
        console.log(file);
        const reader = new FileReader();
        //const f = reader.readAsDataURL(file);
        //formData.append("file", file);
        const preview = document.querySelector("img");
        reader.readAsDataURL(file);
        reader.onload = function(a) {
            var rawLog = reader.result;
            console.log(rawLog);
            preview.src = rawLog;
        }
    };

    return (
        <div style={{border:"solid"}}>
            <form onSubmit={submit}>
                <p>File upload</p>
                <input type='file' accept='image/png, image/jpeg' name='file' id="file"></input>
                <button type='submit'>Submit</button>
            </form>
            <img style={{border:"solid"}} src=''></img>
        </div>
    );
}

export default FileUpload;