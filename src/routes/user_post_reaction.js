const router = require('express').Router();

module.exports = (db) => {
  router.put('/user_post_reaction/', (req, res) => {
    console.log(req.body);
    const {userId, postId, reactionId} = req.body;
    db.query(`
      INSERT INTO users_posts_reactions (user_id, post_id, reaction_type_id)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id, post_id) 
        DO UPDATE SET reaction_type_id = EXCLUDED.reaction_type_id
      RETURNING *;
    `, [userId, postId, reactionId])
    .then(data => {
      console.log('data:', data);
    })
    .catch(err => console.log(err))
  })
  return router
}



// TODO How to update if record doesn't yet exist?