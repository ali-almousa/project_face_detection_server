const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrybt = require('bcrypt-nodejs');
const register = require('./controllers/register.js');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '19283746',
    database : 'smart-brain'
  }
});

db.select('*').from('users').then(data => {
	console.log(data);
});

const app  =express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res)=> { res.json('this is working') })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, bcrybt, db)});

app.post('/register', (req, res) => { register.handleRegister(req, res, bcrybt, db) });

app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => { image.handleIamge(req, res, db)});

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});


app.listen(3000, ()=> {
	console.log('app is running on port 3000')
})