// brings in db, routes, parsing & cors etc. protection
const fs = require('fs')
const path = require('path')

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

const posts = require('./routes/posts')
const reaction_types = require('./routes/reaction_types')
const prompts = require('./routes/prompts')

const app = express();

const db = require('./db');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api', posts(db))
app.use('/api', reaction_types(db))
app.use('/api', prompts(db))

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
    readFile(path.resolve(__dirname, 'db/schema/create.sql')),
    readFile(path.resolve(__dirname, 'db/schema/development.sql'))
  ])
  .then(([create, seed]) => {
    db.query(create)
    .then(() => db.query(seed))
    .then(() => {
      console.log('database reset');
      // res.redirect('/users')
      res.send('db reset successful')
    })}
  )
  .catch(err => console.log(err))
})


// GET user's reactions
app.get('/api/user_reactions/:userId', (req, res) => {
  db.query(`
    SELECT post_id, reaction_type_id
    FROM users_posts_reactions
    WHERE user_id = $1
  `, [req.params.userId])
  .then(({rows: user_reactions}) => {
    res.json(user_reactions)
  })
})


app.get('/', (req, res) => {
  res.send('Oh hi Mark')
})

module.exports = app


