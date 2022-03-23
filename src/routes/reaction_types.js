const router = require('express').Router();

module.exports = (db) => {
  router.get('/reaction_types', (req, res) => {
    db.query(`
      SELECT id, label, icon
      FROM reaction_types;
    `).then(({rows: reactionTypes}) => {
      res.json(
        reactionTypes.reduce(
          (prev, current) => ({...prev, [current.id]: current}),
          {}
        )
      )
    })
  })

  return router;
}
