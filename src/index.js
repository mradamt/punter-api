// port, env, app, server, websockets

const PORT = process.env.PORT || 8001;
const ENV = require('./environment');

const app = require('./app')

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
})
