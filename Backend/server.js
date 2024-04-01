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
//#endregion

//#region config
app.use(cors());
app.options(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 8081;
//#endregion

//#region functions

function hash(string){
    return createHash('sha256').update(string).digest('hex');
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
    
    //Checking if any of the form items are empty or not
    if(req.body.password == "" || req.body.username == ""){
        res.status(500).json({
            token: "isEmpty",   //if it is empty, let frontend know that some parts of the form is empty
        });
    }
    else{
        try{
            db.query(sql, [values], (err, data) => {
                if(err) return res.json({token:"invalidcreds"});
                else{
                console.log(data);
                const comparison = bcrypt.compareSync(req.body.password, data[0].password_hash);  //Compare the password with the bcrypt version
                if (comparison){
                    const token = createJWTToken(req.body.username, req.body.isAdmin);
                    res.cookie("token", token, {
                        httpOnly: true,
                        sameSite: "strict",
                    });
                    res.send({
                        token: token,
                    });
                }
                else{
                    return res.json({token:"Login failed"});  //If login fails due to invalid credentials, let frontend know this situation
                }
                }
            })    
        }
        catch(error){
            console.log("Login failed");
        }
    }

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

app.post('/post', (req, res) => {
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    const post = req.body.post;
    const username = req.body.username;

    const query = "INSERT INTO posts (content, UID) VALUES (?, (SELECT UID FROM users WHERE username=?));";
    db.query(query, [post, username], (err,result) => {
    });
});

app.post('/updateAccount', (req, res) => {
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    const info = req.body;
    for (let key in info){
        let value = info[key];
    }

    //Form SQL query
    var sql = "UPDATE users SET ";
    var sqlData = [];     //key -> value
    var index;
    var newUsername;
    for (let key in info){
        if(key === "oldusername"){
           // console.log(key);
            index = key;
            continue;
        }
        else{
            var value = info[key];
            if(key === "username"){
                newUsername = value;    
            }
            sql = sql + key + " = '" + value + "', "; 
        }
    }   
    sqlData.push(info[index]);
    //console.log(sqlData);
    var trimmedSql = sql.slice(0, sql.length - 2);
    trimmedSql = trimmedSql + " WHERE username=" + "'" + info[index] + "';";
    //console.log(trimmedSql);

    db.query(trimmedSql, (err, data) => {
        console.log(err);
    })

    const token = createJWTToken(newUsername, req.body.isAdmin);
    res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
    });
    res.send({
        token: token,
    });
    
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
            return res.json(decodedToken);
        } else {
        // Access Denied
        return res.status(401).json({ message: 'error' });
        }
    } catch (error) {
        // Access Denied
        return res.status(401).json({ message: 'error' });
    }
});


app.get("/getAllPosts", (req, res) => {
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');

    const sql = "SELECT * FROM posts LEFT JOIN users ON posts.UID=users.UID ORDER BY created_at DESC;";
    db.query(sql, (err,data) => {
        return res.send(data);
    })
});

app.get("/userdata", (req, res) => {
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');

    if(!req.originalUrl.includes('=null')){
        let index = req.originalUrl.indexOf("=");
        let UID = "";
        for (let i = index + 1; i < req.originalUrl.length; i++){
            UID = UID + req.originalUrl[i];
        }
        const intUID = parseInt(UID, 10);
        const sql = "SELECT * FROM posts LEFT JOIN users ON posts.UID=users.UID WHERE posts.UID=? ORDER BY created_at DESC;"
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