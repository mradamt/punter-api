// brings in db, routes, parsing & cors etc. protection

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

const app = express();

const db = require('./db');

// const routes = require('./routes/')

app.get('/', (req, res) => {
  res.send('Oh hi Mark')
})

function app () {
  
}

module.exports = app;
