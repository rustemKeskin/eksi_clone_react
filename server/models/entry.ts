// file entry.ts

import mongoose from "mongoose";
const Title = require('./title')
const {User,db1} = require('./user');

const entrySchema = new mongoose.Schema({

  entry: {
    type: String,
    required: true,
  },
  user_id : {
    type : String,
    ref : User,
    required : true
  },
  title_id : {
    type : String,
    ref : Title,
    required : true
  }
},{timestamps : true});

const Entry = db1.model('Entry', entrySchema)

module.exports = Entry;

