require('dotenv').config()
const express = require('express')
const massive = require('massive')
const session = require('express-session')
const {SERVER_PORT, DB_STRING, SESSION_SECRET} = process.env

const userCtrl = require('./controllers/users')

const app = express()

app.use(express.json())


//session/cookies
app.use(session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 24 * 365 * 10
        }
}))

//db connection
massive({
    connectionString: DB_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((dbInstance => {
    app.set('db', dbInstance)
    console.log('DB Ready')
    app.listen(SERVER_PORT, () => {
        console.log(`Server listening on ${SERVER_PORT}`)
    })
}))

//endpoints

//auth
app.post('/auth/register', userCtrl.register)
app.post('/auth/signin', userCtrl.signIn)
app.get('/auth/me', userCtrl.getUser)
app.post('/auth/logout', userCtrl.logout)

//chores
app.get('/chores')
app.post('/chores/create')
app.put('/chores/edit')
app.delete('/chores/remove')
 
//households
app.get('/households')
app.post('/households/create')
app.put('/households/edit')
app.delete('/households/remove')