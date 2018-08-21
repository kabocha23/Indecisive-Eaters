require('dotenv').config({path: '../.env'});

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;

const yelpController = require('./controllers/yelpController');


app.use(bodyParser.json());

app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}))

app.use(cors());

app.get('/api/restaurantsearch', yelpController.regularSearch)

app.listen(PORT, () => 
  console.log('Listening on port:', PORT)
);
