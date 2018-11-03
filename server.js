const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const images = require('./controllers/images')
const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'ravi',
        password: '',
        database: 'smart-brain'
    }
});

const PORT = process.env.PORT;

//middle-ware
const app = express();
app.use(bodyParser.json())
app.use(cors())


app.get('/', (req, res) => res.json("its working"))

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req,res) => register.handleRegister(req, res, db, bcrypt))

app.get('/profile/:id', (req,res) => profile.handleProfile(req,res,db))

app.put('/images', (req,res) => images.handleImages(req,res,db))

app.post('/imagesurl', (req,res) => images.handleAPICall(req,res))

app.listen( PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`);
})