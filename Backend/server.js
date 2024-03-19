
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

app.use(cors());
app.options(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8081;

//#region functions

function verifyToken(req, res){
    const tokenHeaderKey = 'jwt-token';
    const jwtSecretKey = process.env.DIY_JWT_SECRET;
    const token = req.headers[tokenHeaderKey];

    try{
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            return true;
        }
        else{
            return false;
        }
    } catch(error){
        return false;
    }
}

function hash(string){
    return createHash('sha256').update(string).digest('hex');
}

function createToken(passwordHash, salt){
    //Creating a user token from the password hash and salt.
    //This function takes random pieces of the bcrypt hash and concats with the salt value.
    //After that, the program hashes the string using sha256
    const lengthOfPasswordHash = passwordHash.length;
    const randomIndexofPasswordHash = Math.floor(Math.random() * (lengthOfPasswordHash - 12)) + 12;
    var stringToBeHashed = "";
    for (let i = 0; i < randomIndexofPasswordHash; i++){
        console.log(passwordHash.charAt(i));
        stringToBeHashed = stringToBeHashed + passwordHash.charAt(i);
    }
    stringToBeHashed = stringToBeHashed + salt;
    console.log(stringToBeHashed);
    return hash(stringToBeHashed);
}

function createJWTToken(Username, Role){
    let data={
        signInTime: Date.now(),
        username: Username,
        role: Role,
    }
    const jwtSecretKey = process.env.DIY_JWT_SECRET;
    const token = jwt.sign(data, jwtSecretKey);
    return token;
}
//#endregion functions

//#region DB connection
const db = mysql.createConnection({
    host: "localhost",
    user: "dbuser",
    password: "dbuser",
    database: "secureprogramming",
    port: '/var/run/mysqld/mysqld.sock',

});

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

    const sql = "SELECT password_hash, salt, isAdmin FROM users WHERE username = ?" // sql command to retrieve passwords and salt values from db.
    const values = [
        req.body.username,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Login Failed");
        else{
        console.log(data);
        const comparison = bcrypt.compareSync(req.body.password, data[0].password_hash);  //Compare the password with the bcrypt version
        if (comparison){
            const token = createJWTToken(req.body.username, req.body.isAdmin);
            console.log("Token: ", token);
            res.send({
                token: token,
            });
        }
        else{
            return res.json("Login Failed");
        }
        }
    })
});

app.post('/createuser', async (req, res) => {
    
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    const password = req.body.password;
    const saltRounds = 10;

    //Store salt value with the password into database
    const salt = bcrypt.genSaltSync(saltRounds);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    const values = [
        req.body.email,
        req.body.username,
        encryptedPassword,
        salt,
    ];
    const sql = "INSERT INTO users (email, username, password_hash, salt) VALUES (?);";
    db.query(sql, [values], (err,data) => {
        if(err) return res.json("Signup failed");

        return res.json(data);
    })
});
//#endregion POST


//#region GET

app.get("/verifyToken", (req, res) => {
    //res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    const tokenHeaderKey = 'jwt-token';
    const jwtSecretKey = process.env.DIY_JWT_SECRET;
    const token = req.headers[tokenHeaderKey];
    try {
        var parsedToken = JSON.parse(token);
        const verified = jwt.verify(parsedToken.token, jwtSecretKey)
        if (verified) {
            const decodedToken = jwtDecode(parsedToken.token);
        } else {
        // Access Denied
        return res.status(401).json({ message: 'error' });
        }
    } catch (error) {
        console.log("an Error");
        // Access Denied
        return res.status(401).json({ message: 'error' });
    }
});

//#endregion GET


app.listen(port, () =>{
    console.log("Listening...");
});