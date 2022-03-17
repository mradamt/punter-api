// port, env, app, server, websockets

const PORT = process.env.PORT || 8008;
const ENV = require('./environment');

const app = require('./app')

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
})
