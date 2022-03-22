const router = require('express').Router();

module.exports = (db) => {
  // GET posts : include author: {id, username} object and post's reaction counts array
  router.get('/posts', (req, res) => {
    db.query(`
      SELECT
        posts.id, 
        posts.creation_date   as creation_date, 
        posts.spicy_language  as spicy_language, 
        posts.text            as text,
        posts.prompt_id,
        json_build_object('id', posts.user_id, 'username', users.username) as author, 
        json_build_array(
          COUNT(users_posts_reactions.reaction_type_id)
            FILTER (WHERE users_posts_reactions.reaction_type_id = 1),
          COUNT(users_posts_reactions.reaction_type_id)
            FILTER (WHERE users_posts_reactions.reaction_type_id = 2),
          COUNT(users_posts_reactions.reaction_type_id)
            FILTER (WHERE users_posts_reactions.reaction_type_id = 3),
          COUNT(users_posts_reactions.reaction_type_id)
            FILTER (WHERE users_posts_reactions.reaction_type_id = 4),
          COUNT(users_posts_reactions.reaction_type_id)
            FILTER (WHERE users_posts_reactions.reaction_type_id = 5)
        ) as reaction_counts
      FROM posts
      JOIN users
        ON (posts.user_id = users.id)
      LEFT JOIN users_posts_reactions 
        ON (posts.id = users_posts_reactions.post_id)
      GROUP BY posts.id, posts.user_id, users.username, posts.prompt_id, creation_date, spicy_language, text
      ORDER BY posts.creation_date DESC;
    `).then(({rows: posts}) => {
      res.json(
        posts.reduce(
          (previous, current) => ({...previous, [current.id]: current}),
        {}
        )
      )
    })
  })

  // POST posts
  router.post('/posts', (req, res) => {
    const {user_id, prompt_id, text, spicy_language} = req.body
    db.query(`
        INSERT INTO posts (user_id, prompt_id, text, spicy_language_bool) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [user_id, prompt_id, text, spicy_language])
    res.send('oh hiii mark')
  })

  return router
};
