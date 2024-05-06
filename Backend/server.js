//#region imports
const jwt = require('jsonwebtoken');
const decodeToken = require('react-jwt');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');
require("dotenv").config();
const { createHash } = require('crypto');
const { jwtDecode } = require('jwt-decode');
const { useState } = require('react');
//#endregion

//#region config
app.use(cors());
app.options(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8081;

const db = mysql.createConnection({
    host: "localhost",
    user: "dbuser",
    password: "dbuser",
    database: "secureprogramming",
    port: '/var/run/mysqld/mysqld.sock',

});

//#region functions


async function JWTSigner(username, sql) {
    return await new Promise(function (resolve, reject) {
        db.query(sql, username, (err,data) => {
            passwordFromDB = data[0].password_hash;
            let password_hash = createHash('sha256').update(passwordFromDB).digest('hex');   //Storing the sha256 hashed version of the bcrypted hash of the password
            let tokenData={                                                                  //to be able to mitigate cookie related broken authentications. 
                signInTime: Date.now(),                                                      //This sha256 hash will be compared to the original password when trying to log in
                username: username,
                ph: password_hash,
                //Add a random data to randomize the token
            }
            const jwtSecretKey = process.env.DIY_JWT_SECRET;
            const signedJWT = jwt.sign(tokenData, jwtSecretKey);
            resolve(signedJWT);
        });
    })
}
async function createJWTToken(bool, username){
    //Using username and a date to keep track on the user.
    let rand = (Math.random() + 1).toString(36).substring(16);
    if (bool){
        const sql = "SELECT password_hash FROM users WHERE username=?";
        JWTSigner(username, sql).then(function(results){
            res.cookie("token", results, {
                httpOnly: true,
                sameSite: "strict",
            });
            res.send({
                token: results,
            });
        });
    }
}
//#endregion functions

//#region DB connection
db.connect(e => {
    if(e){
        console.log("Database connection failed", e);
    }
    else{
        console.log("Database conneciton has been established");
    }
});
//#endregion DB connection

//#region POST
app.use('/login', (req, res) => {
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    
    //SQL Injection Detection
    const reg = /--|"|'|[1=1]|-|=|{|}/gi  //Regex case to detect any input with the intentions of SQLi
    if(reg.test(req.body.username)){
        res.status(500).send({
            token:500,
        });
    }
    else{
        const sql = "SELECT password_hash, isAdmin FROM users WHERE username = ?" // sql command to retrieve passwords and salt values from db.
        const values = [
            req.body.username,
        ]
        //Checking if any of the form items are empty or not
        if(req.body.password == "" || req.body.username == ""){
            res.status(501).send({
                token: 501
            }); //if it is empty, let frontend know that some parts of the form is empty
        }
        else{
            try{
                db.query(sql, [values], (err, data) => {
                    if(err) {
                        console.log(err);
                        return res.status(502).send({
                            status:502,
                        });
                    }
                    else if(data && data.length > 0){
                    const comparison = bcrypt.compareSync(req.body.password, data[0].password_hash);  //Compare the password with the bcrypt version

                    //Create a JWT token to keep track of the user. 
                    if (comparison){ //If password is correct,
                        const sql = "SELECT password_hash FROM users WHERE username=?";
                        JWTSigner(req.body.username, sql).then(function(results){
                            res.cookie("token", results, {
                                httpOnly: true,
                                sameSite: "strict",
                            });
                            res.status(200).send({
                                token: results,
                            });
                            
                        });
                    }
                    else{
                        return res.status(503).send({
                            token:503
                        });  //If login fails due to invalid credentials, let frontend know this situation
                    }
                    }
                })    
            }
            catch(error){
                console.log("Login failed");
            }
        }
    }


});

app.post('/userdata', (req,res) => {
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    const sql = "SELECT username, file, UID FROM users WHERE username=?;"
    const uname = req.body.username;
    db.query(sql, uname, (err,data) =>{
        return res.send(data);
    })
})

app.post('/createuser', async (req, res) => {
    
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    const password = req.body.password;
    const saltRounds = 10;

    //Salt is for bcrypt to encrypt the password
    const salt = bcrypt.genSaltSync(saltRounds);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    //Gathering all data into an object.
    const values = [
        req.body.email,
        req.body.username,
        encryptedPassword,
    ];

    //Forging SQL query to store user information
    const sql = "INSERT INTO users (email, username, password_hash) VALUES (?);";
    //DB query
    db.query(sql, [values], (err,data) => {
        if(err) return res.json("Signup failed");

        return res.json(data);
    })
});

app.post('/post', (req, res) => { //end-point for users to post something
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    const post = req.body.post;
    const username = req.body.username;

    const query = "INSERT INTO posts (content, UID) VALUES (?, (SELECT UID FROM users WHERE username=?));";
    db.query(query, [post, username], (err,result) => {
    });
});

app.post('/search', (req,res) => {
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    const reg = /--|"|'|[1=1]|-|=|{|}/gi ;
    if (!reg.test(req.body.search)){
        const sql = "SELECT username, UID, file FROM users WHERE username=?"
    
        try{
            db.query(sql, req.body.search, (err,data) => {
                if(data.length === 0){
                    res.send(JSON.stringify({result:false,search:req.body.search}))
                }
                else{
                    res.send({result:data, search:req.body.search});
                }
            });
        }
        catch(error){
            console.log("An error has been occured");
        }
    }
    else{
        res.send({result:[], search:req.body.search});
    }
})

app.post('/updateAccount', (req, res) => { //User update end-point
    const saltRounds = 10;
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    //Form SQL query
    var sql = "UPDATE users SET ";
    var sqlData = [];     //key -> value
    var index;
    var newUsername;

    const reg = /<|>|script|alert()|onError()/gi  //Regex case to detect any input with the intentions of XSS
    if(reg.test(req.body.username)){
        res.status(500)
    }
    else{
        try{
            const info = req.body;
            var userNameChange = 0;
            for (let key in info){ //iterate over the parameters. (password, username, etc.)
                if(key === "oldusername"){   //If there is the oldusername item in JSON, assume username is not changed
                    index = key;            // Set index to key
                    continue;
                }
                else{
                    var value = info[key];
                    if(key === "username"){   //If there is a username column in the JSON, Assume it is a new username
                        newUsername = value;    
                        userNameChange = 1;
                    }
                    if(key === "password"){   //If password input is not empty, create new generated password and send it to server. 
                        const salt = bcrypt.genSaltSync(saltRounds);
                        const encryptedPassword = bcrypt.hashSync(info[key], salt);
                        value = encryptedPassword;            
                        key = "password_hash";
                    }
                    sql = sql + key + " = '" + value + "', ";   //This line forges a SQL query with the key values inside fo info. Info contains the input names and values. 
                                                                //based on the names and values it forms key = value, string and attaches to the base string. 
                                                                // At the end, the query will be finalazed by adding the condition. 
                    //console.log(sql);   //Uncomment this line to see the full output.
                }
            }   
        
            //Here, the condition for the SQL query is added. WHERE username = <old_username>;
            sqlData.push(info[index]);
            var trimmedSql = sql.slice(0, sql.length - 2);
            trimmedSql = trimmedSql + " WHERE username=" + "'" + info[index] + "';";
        
            db.query(trimmedSql, (err, data) => {
                //console.log(err);
            })
        
        
            //Creating a new token with the new username, sending it to the frontend.
            if(userNameChange){
                const token = createJWTToken(newUsername, req.body.isAdmin);
                res.cookie("token", token, {
                    httpOnly: true,
                    sameSite: "strict",
                });
                res.send({
                    token: token,
                });   
            }
        }
        catch(error){
            console.log("Error");
        }
    }

    
});
//#endregion POST


//#region GET

app.get("/verifyToken", (req, res) => {
    //res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    const tokenHeaderKey = 'jwt-token';
    const jwtSecretKey = process.env.DIY_JWT_SECRET;
    const token = req.headers[tokenHeaderKey];
    var parsedToken = JSON.parse(token);
    const sql = "SELECT password_hash FROM users WHERE username=?";
    try {
        jwt.verify(parsedToken.token, jwtSecretKey, function(err, decoded) { //Verifying the signature of the JWT
            const decodedToken = jwtDecode(parsedToken.token);
            const username = decodedToken.username;
            const password_hash = decodedToken.ph;   //Getting the sha256 hashed password from the token. 
            db.query(sql, username, (err,data) => {
                let DBpassword = data[0].password_hash;        //Getting the original bcrypt hash to compare with the one from the token
                let sha256DBpassword = createHash('sha256').update(DBpassword).digest('hex'); //Hashing the original bcrypt
                const passVerified = sha256DBpassword == decodedToken.ph ? true : false;   //Check if the hashes are the same
                if(passVerified){
                    return res.status(200).json(decodedToken);   //If yes, let the user in
                }
                else{
                    return res.status(401).json({ message: 'error' });        //If not, do not let the user in
                }
            });
        })
    } catch (error) {
        // Access Denied
        return res.status(401).json({ message: 'error' });
    }
});

app.get("/getAllPosts", (req, res) => { //Homepage endpoint. fetches all posts.
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');

    const sql = "SELECT * FROM posts LEFT JOIN users ON posts.UID=users.UID ORDER BY created_at DESC;";
    db.query(sql, (err,data) => {
        return res.send(data);
    })
});

app.get("/userposts", (req, res) => {  //This is the endpoint to fetch all posts for only one user.
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');

    if(!req.originalUrl.includes('=null')){  //if the parameter is null
        let index = req.originalUrl.indexOf("=");
        let UID = "";
        for (let i = index + 1; i < req.originalUrl.length; i++){
            UID = UID + req.originalUrl[i];
        }
        const intUID = parseInt(UID, 10);
        const sql = "SELECT * FROM posts LEFT JOIN users ON posts.UID=users.UID WHERE posts.UID=? ORDER BY created_at DESC;" //Select all the posts of the given UID
        db.query(sql, intUID, (err,data) => {
            return res.send(data);
        })
    }
    else{
        var token = sessionStorage.getItem("token");
        const jwtSecretKey = process.env.DIY_JWT_SECRET;
        const verified = jwt.verify(token, jwtSecretKey);
        if (verified){
            const decodedJWT = jwtDecode(token);
        }
    }

})
//#endregion GET


app.listen(port, () =>{
    console.log("Listening...");
});