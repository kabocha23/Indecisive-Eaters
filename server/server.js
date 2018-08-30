require('dotenv').config({path: '../.env'});

const express = require('express');
const path = require('path');
// const session = require('express-session');
const cors = require('cors');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 4000;

const yelpController = require('./controllers/yelpController');

app.use(bodyParser.json());

app.use(cors());

app.use(express.static('../build/'));

app.get('/api/restaurantsearch', yelpController.regularSearch)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port, () => 
  console.log(`Listening on port: ${port}`)
);
