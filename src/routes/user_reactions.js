const router = require('express').Router();

module.exports = (db) => {
  router.get('/user_reactions/:userId', (req, res) => {
    db.query(`
      SELECT post_id, reaction_type_id
      FROM users_posts_reactions
      WHERE user_id = $1
    `, [req.params.userId])
    .then(({rows: user_reactions}) => {
      res.json(user_reactions)
    })
  })

  return router
}
