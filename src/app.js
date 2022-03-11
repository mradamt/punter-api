// the express application
// brings in db, routes, parsing & cors etc. protection

const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Oh hi Mark')
})

app.listen(port, () => {
  console.log(`app listening on port: ${port}`);
})
