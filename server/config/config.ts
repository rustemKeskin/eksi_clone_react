require('dotenv').config();
const PORT = process.env.PORT
const HOST = process.env.HOST;
const NODE_ENV = process.env.NODE_ENV
const SECRET = process.env.SECRET
const FIRST_MONGODB_URI = process.env.FIRST_MONGODB_URI

module.exports = {
  PORT,
  HOST,
  NODE_ENV,
  SECRET,
  FIRST_MONGODB_URI,
}

