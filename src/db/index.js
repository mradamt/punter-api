const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL || "",
  ssl: {
    rejectUnauthorized: false
  }
})

client
  .connect()
  .catch(err => console.log(`Unable to connect to postgres server\n${err}`))

module.exports = client;
