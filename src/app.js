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
        COUNT(users_posts_reactions.reaction_type_id)
          FILTER (WHERE users_posts_reactions.reaction_type_id = 1)
          AS r1,
        COUNT(users_posts_reactions.reaction_type_id)
          FILTER (WHERE users_posts_reactions.reaction_type_id = 2)
          AS r2,
        COUNT(users_posts_reactions.reaction_type_id)
          FILTER (WHERE users_posts_reactions.reaction_type_id = 3)
          AS r3,
        COUNT(users_posts_reactions.reaction_type_id)
          FILTER (WHERE users_posts_reactions.reaction_type_id = 4)
          AS r4,
        COUNT(users_posts_reactions.reaction_type_id)
          FILTER (WHERE users_posts_reactions.reaction_type_id = 5)
          AS r5,
        creation_date
      FROM posts
      JOIN prompts
        ON (posts.prompt_id = prompts.id)
      JOIN users
        ON (posts.user_id = users.id)
      JOIN users_posts_reactions 
        ON (posts.id = users_posts_reactions.post_id)
      GROUP BY prompts.text, posts.text, author, creation_date
      ORDER BY posts.creation_date DESC;
    `
  ).then(({rows: posts}) => {
    res.send(posts)
  })
})

app.get('/react', (req, res) => {
  db.query(
    `
      SELECT 
        post_id, 
        COUNT(reaction_type_id)
          FILTER (WHERE reaction_type_id = 1)
          AS r1,
        COUNT(reaction_type_id)
          FILTER (WHERE reaction_type_id = 2)
          AS r2,
        COUNT(reaction_type_id)
          FILTER (WHERE reaction_type_id = 3)
          AS r3,
        COUNT(reaction_type_id)
          FILTER (WHERE reaction_type_id = 4)
          AS r4,
        COUNT(reaction_type_id)
          FILTER (WHERE reaction_type_id = 5)
          AS r5
      FROM users_posts_reactions
      GROUP BY post_id;
    `
  ).then(({rows:reactions}) => {
    res.send(reactions)
  })
})

app.get('/api/reaction_types', (req, res) => {
  db.query(`
    SELECT index, label, icon
    FROM reaction_types;
  `).then(({rows: reactionTypes}) => {
    res.json(reactionTypes)
  })
})

app.get('/', (req, res) => {
  res.send('Oh hi Mark')
})

module.exports = app


