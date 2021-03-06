const router = require('express').Router();

module.exports = (db, reactionTypeIds) => {
  // GET posts
  router.get('/posts/:userId', (req, res) => {
    /* Target output format is array of:
        {
          "id": 1,
          "prompt_id": 1,
          "creation_date": "2022-01-31T17:00:00.000Z",
          "spicy_language": false,
          "text": "sample post text",
          "author": {"id": 1, "username": "ABC"},
          "reaction_counts": [2,0,1,0,0],
          "user_reaction_id": 3
        }
    */
    const userId = req.params.userId || null;
    const reaction_countsQuery = reactionTypeIds.map(id => `
      COUNT (users_posts_reactions.reaction_type_id) 
      FILTER (WHERE users_posts_reactions.reaction_type_id = ${id})
    `).toString()
    db.query(`
      SELECT
        posts.id, 
        posts.prompt_id,
        posts.creation_date   AS creation_date, 
        posts.spicy_language  AS spicy_language, 
        posts.text            AS text,
        json_build_object('id', posts.user_id, 'username', users.username) 
          AS author,
        json_build_array(${reaction_countsQuery}) 
          AS reaction_counts,
        (SELECT users_posts_reactions.reaction_type_id
            FROM users_posts_reactions
            WHERE users_posts_reactions.user_id = $1
            AND users_posts_reactions.post_id = posts.id
        ) AS user_reaction_id
      FROM posts
      JOIN users
        ON (posts.user_id = users.id)
      LEFT JOIN users_posts_reactions 
        ON (posts.id = users_posts_reactions.post_id)
      GROUP BY posts.id, posts.user_id, users.username, posts.prompt_id, creation_date, spicy_language, text, user_reaction_id
      ORDER BY posts.creation_date DESC;
    `, [userId])
    .then(({rows: posts}) => {
      res.json(posts)
    })
    .catch(err => console.log(err))
  })

  router.get('/posts', (req, res) => {
    res.redirect('/api/posts/0')
  })

  // POST posts
  router.post('/posts', (req, res) => {
    const {user_id, prompt_id, text, spicy_language} = req.body
    db.query(`
      INSERT INTO posts (user_id, prompt_id, text, spicy_language) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `, [user_id, prompt_id, text, spicy_language])
    .then(data => {
      res.json(data.rows[0])
    })
    .catch(err => console.log(err))
  })

  return router
};
