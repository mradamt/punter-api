// brings in db, routes, parsing & cors etc. protection
const fs = require('fs')
const path = require('path')

const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')

const app = express();

const db = require('./db');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

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

// GET all posts, include author id, username and post's reaction counts
// Prompts & reaction_types will be fetched by frontend separately, including them here would double-fetch
app.get('/api/posts', (req, res) => {
  db.query(`
    SELECT
      posts.id, 
      posts.user_id,
      users.username, 
      posts.prompt_id,
      posts.creation_date   as creation_date, 
      posts.spicy_language  as spicy_language, 
      posts.text            as text,
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
        AS r5
    FROM posts
    JOIN users
      ON (posts.user_id = users.id)
    LEFT JOIN users_posts_reactions 
      ON (posts.id = users_posts_reactions.post_id)
    GROUP BY posts.id, posts.user_id, users.username, posts.prompt_id, creation_date, spicy_language, text
    ORDER BY posts.creation_date DESC;
  `).then(({rows: posts}) => {
    res.json(posts)
  })
})
app.post('/api/posts', (req, res) => {
  // INSERT INTO posts (user_id, prompt_id, text, creation_date, spicy_language_bool) VALUES (), ();
  let reqData = {
    "user_id": 1,
    "prompt_id": 1,
    "text": "placeholder post 0",
    "spicy_language": false,
  }

  const {user_id, prompt_id, text, spicy_language} = req.body
  db.query(
    `
      INSERT INTO posts (user_id, prompt_id, text, spicy_language_bool) 
      VALUES ($1, $2, $3, $4);
    `, [user_id, prompt_id, text, spicy_language])
  res.send('oh hiii mark')
})

// GET all reaction types
app.get('/api/reaction_types', (req, res) => {
  db.query(`
    SELECT label, icon
    FROM reaction_types;
  `).then(({rows: reactionTypes}) => {
    res.json(reactionTypes)
  })
})

// GET all prompts
app.get('/api/prompts', (req, res) => {
  db.query(`
    SELECT id, text
    FROM prompts;
  `).then(({rows: prompts}) => {
    res.json(prompts)
  })
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


