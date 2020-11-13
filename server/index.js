require('dotenv').config();

const express = require('express');
const massive = require('massive');
const ctrl = require('./controller')
const {SESSION_SECRET, SERVER_PORT, CONNECTION_STRING} = process.env;

const app = express();

app.use(express.json());


massive({
    connectionString: CONNECTION_STRING,
    ssl:{
        rejectUnauthorized: false
    }
}).then( db => {
    app.set('db', db)
    console.log("DB set up!")
}).catch(err => console.log(err))
 
app.post('/auth/register', ctrl.register)
app.post('/auth/login', ctrl.login)

app.listen(SERVER_PORT, console.log(`You are on Port: ${SERVER_PORT}`))