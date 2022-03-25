const router = require('express').Router();

module.exports = (db) => {
  // GET posts : include author:{id, username}, reaction_counts:[...], user_reaction_index
  router.get('/posts/:userId', (req, res) => {
    const userId = req.params.userId || null;
    const reactionTypeIds = [1,2,3,4,5] // reaction types to output reaction counts for
    const reaction_countsQuery = reactionTypeIds.map(id => {
      return `${id}, 
        COUNT (users_posts_reactions.reaction_type_id) FILTER 
        (WHERE users_posts_reactions.reaction_type_id = ${id})`
    }).toString()

    db.query(`
      SELECT
        posts.id, 
        posts.creation_date   as creation_date, 
        posts.spicy_language  as spicy_language, 
        posts.text            as text,
        (SELECT users_posts_reactions.reaction_type_id
          FROM users_posts_reactions
          WHERE users_posts_reactions.user_id = $1
          AND users_posts_reactions.post_id = posts.id) as user_reaction_index,
        json_build_object('id', posts.prompt_id) as prompt,
        json_build_object('id', posts.user_id, 'username', users.username) as author, 
        json_build_object(${reaction_countsQuery}) as reaction_counts
      FROM posts
      JOIN users
        ON (posts.user_id = users.id)
      LEFT JOIN users_posts_reactions 
        ON (posts.id = users_posts_reactions.post_id)
      GROUP BY posts.id, posts.user_id, users.username, posts.prompt_id, creation_date, spicy_language, text, user_reaction_index
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
        INSERT INTO posts (user_id, prompt_id, text, spicy_language_bool) 
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `, [user_id, prompt_id, text, spicy_language])
    res.send('oh hiii mark')
  })

  return router
};
