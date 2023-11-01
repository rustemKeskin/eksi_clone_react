const mongoose = require('mongoose')
const {FIRST_MONGODB_URI} = require('../config/config');
import { IUser } from '../ts/interfaces/interfaces'
const uniqueValidator = require('mongoose-unique-validator')

// initial Mongoose connection atlas
const initialConnection = mongoose.createConnection(FIRST_MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db1 = initialConnection.useDb('eksi');

const userSchema = new mongoose.Schema({

  user_name: {
    type: String,
    minLength: 3,
    maxLength: 25,
    required: true,
    unique : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
    trim : true,
    lowercase : true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  },
  password:{
    type : String,
    required : true,
  },
  image_url:{
    type : String,
    required : true,
    default : '/images/1.jpg'
  }
});

userSchema.plugin(uniqueValidator)

const User = db1.model('User', userSchema)

module.exports = { User, initialConnection, db1 };

