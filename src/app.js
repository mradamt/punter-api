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

app.get('/users', (req, res) => {
  db.query('select * from Users;')
  .then(({rows: users}) => {
    res.send(users)
  })
})

// app.get('/posts/$userId', (req, res) => {
app.get('/posts', (req, res) => {
  db.query(
    `
      SELECT 
        prompts.text as prompt, 
        posts.text as text, 
        users.username as author,
        creation_date
      FROM posts
      JOIN prompts
        ON (posts.prompt_id = prompts.id)
      JOIN users
        ON (posts.user_id = users.id)
      JOIN users_posts_reactions 
        ON (posts.id = users_posts_reactions.post_id)
      ORDER BY posts.creation_date;
    `
  ).then(({rows: posts}) => {
    res.send(posts)
  })
})

app.get('/react', (req, res) => {
  db.query(
    `
      SELECT post_id, COUNT(reaction_type_id) 
      FROM users_posts_reactions
      WHERE reaction_type_id = 1
      GROUP BY post_id;
    `
  ).then(({rows:reactions}) => {
    res.send(reactions)
  })
})

app.get('/', (req, res) => {
  res.send('Oh hi Mark')
})

module.exports = app


