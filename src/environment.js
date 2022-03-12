const { resolve } = require('path');

const ENV = process.env.NODE_ENV || "development";
const PATH = resolve(__dirname, "../.env." + ENV);

require('dotenv').config({ path: PATH });

module.exports = ENV;
