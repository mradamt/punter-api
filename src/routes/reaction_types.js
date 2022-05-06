const router = require('express').Router();

module.exports = (db, reactionTypeIds) => {
  // GET reaction_types
  router.get('/reaction_types', (req, res) => {
    db.query(`
      SELECT id, label, icon
      FROM reaction_types
      WHERE id = any ($1);
    `, [reactionTypeIds])
    .then(({rows: reactionTypes}) => {
      res.json(reactionTypes)
    })
    .catch(err => console.log(err))
  })

  return router;
}
