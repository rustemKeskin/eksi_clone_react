import mongoose from "mongoose";
const { User, db1 } = require('./user');
const uniqueValidator = require('mongoose-unique-validator')

const titleSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true,
    unique : true
  },
  user_id : {
    type : mongoose.Schema.Types.ObjectId,
    ref : User,
    required : true
  }
},{timestamps : true});

titleSchema.plugin(uniqueValidator)


const Title = db1.model('Title', titleSchema)

module.exports = Title;
