const express = require('express');
const bodyParser = require('body-parser')
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const bcrypt = require('bcrypt');

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

db.connect(e => {
    if(e){
        console.log("Database connection failed", e);
    }
    else{
        console.log("Database conneciton has been established");
    }
});

app.use('/login', (req, res) => {
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');

    const sql = "SELECT password_hash FROM users WHERE username = ?" // sql command
    const values = [
        req.body.username,
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Login Failed");
        const comparison = bcrypt.compare(req.body.password, data[0]);
        if (comparison){
            const token = 'test123';
        }
        else{
            return res.json("Login Failed");
        }
    })
    // res.send({
    //     token:'test123'
    // });
});

app.post('/createuser', async (req, res) => {
    
    res.set('Acces-Control-Allow-Origin', 'http://127.0.0.1:3000');
    const password = req.body.password;
    const saltRounds = 10;

    //Salt değerini burada oluştur ve assign et, daha sonrasında da bu salt değerini database'e yaz.
    const encryptedPassword = bcrypt
                                .genSalt(saltRounds)
                                    .then(salt => {
                                        console.log('Salt : ', salt)
                                        return bcrypt.hash(password, salt)
                                    })
                                    .then(hash => {
                                        console.log('Hash: ', hash)
                                    })
    const values = [
        req.body.email,
        req.body.username,
        req.body.password,
    ];
    const sql = "INSERT INTO users (email, username, password_hash) VALUES (?);";
    db.query(sql, [values], (err,data) => {
        if(err) return res.json("Signup failed");

        return res.json(data);
    })
});

app.listen(port, () =>{
    console.log("Listening...");
});