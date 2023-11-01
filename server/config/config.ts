require('dotenv').config();
const PORT = process.env.PORT
const HOST = process.env.HOST;
const NODE_ENV = process.env.NODE_ENV
const SECRET = process.env.SECRET
const PASSWORD = process.env.PASSWORD
const FIRST_MONGODB_URI = process.env.FIRST_MONGODB_URI
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export {
  PORT,
  HOST,
  NODE_ENV,
  SECRET,
  PASSWORD,
  FIRST_MONGODB_URI,
  ACCESS_TOKEN_SECRET,
}

