// brings in db, routes, parsing & cors etc. protection
const fs = require('fs')
const path = require('path')

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

const app = express();

const db = require('./db');

// const routes = require('./routes/')

// Readfile function to read in db reset instructions, rtn Promise
const readFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

app.get('/dbreset', (req, res) => {
  Promise.all([
    readFile(path.resolve(__dirname, './db/schema/create.sql')),
    readFile(path.resolve(__dirname, './db/schema/development.sql'))
  ])
  .then(([create, seed]) => {
    db.query(create);
    db.query(seed);
    // res.send(db.query('SELECT * from Users;'))
  })
  .catch(err => console.log(err))
})
app.get('/', (req, res) => {
  res.send('Oh hi Mark')
})

module.exports = app


