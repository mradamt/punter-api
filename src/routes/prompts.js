const router = require('express').Router();

module.exports = (db) => {
  router.get('/prompts', (req, res) => {
    db.query(`
      SELECT id, text
      FROM prompts;
    `).
    then(({rows: prompts}) => {
      res.json(
        prompts.reduce(
          (prev, current) => ({...prev, [current.id]: current}),
          {}
        )
      )
    })
    .catch(err => console.log(err))
  })

  return router
}
