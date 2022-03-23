// Import file manipulation
const fs = require('fs')
const path = require('path')

// Import modules
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

// Import separate route for each resource
const posts = require('./routes/posts')
const reaction_types = require('./routes/reaction_types')
const prompts = require('./routes/prompts')
const user_reactions = require('./routes/user_reactions')

// Create the 'app'
const app = express();

// Import connection to 'pg' client
const db = require('./db');

// Setup app tools
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Mount resource routes
app.use('/api', posts(db))
app.use('/api', reaction_types(db))
app.use('/api', prompts(db))
app.use('/api', user_reactions(db))

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

// GET database RESET -- 'password' requiredd
app.get('/api/reset/:pw', (req, res) => {
  if (req.params.pw !== "dertaberse") {
    res.send('pw required (include as a param) to reset db')
    return
  }
  Promise.all([
    readFile(path.resolve(__dirname, 'db/schema/create.sql')),
    readFile(path.resolve(__dirname, 'db/schema/development.sql'))
  ])
  .then(([create, seed]) => {
    db.query(create)
    .then(() => db.query(seed))
    .then(() => {
      console.log('database reset executed without error');
      res.send(`Database reset executed without error<br/>: ${new Date()}`)
    })}
  )
  .catch(err => console.log(err))
})

// GET home page (login page) -- TODO
app.get('/', (req, res) => {
  res.send('Oh hi Mark')
})

module.exports = app


