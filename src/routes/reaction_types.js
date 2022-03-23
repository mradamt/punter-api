const router = require('express').Router();

module.exports = (db) => {
  router.get('/reaction_types', (req, res) => {
    db.query(`
      SELECT label, icon
      FROM reaction_types;
    `).then(({rows: reactionTypes}) => {
      res.json(reactionTypes)
    })
  })

  return router;
}
