const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/sigin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
                  client: 'pg',
                  connection: {
                    connectionString : process.env.DATABASE_URL,
                    ssl: true
                    // host : 'postgresql-animate-92521', //127.0.0.1 if want to use localhost
                    // user : 'postgres',
                    // password : 'test',
                    // database : 'smartbrain'
                  }
                });

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {res.send('it is working');})
app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)});
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)}); //dependencies injection
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res, db)});

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port 3000 ${process.env.PORT}`);
})

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userid --> GET = user
/image --> PUT --> user
*/