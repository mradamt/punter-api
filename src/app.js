// brings in db, routes, parsing & cors etc. protection

const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Oh hi Mark')
})

module.exports = app;
