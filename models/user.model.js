const { uniq } = require("lodash");
const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/userRoles");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    validate: [validator.isEmail, "field must be "],
  },
  password: {
    type: String,
    require: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum :[userRoles.USER , userRoles.ADMIN , userRoles.MANAGER],
    default :userRoles.USER
  },
  avatar : {
    type :String , 
    default : 'uploads/avatar.jpg'
  }
});

module.exports = mongoose.model("User", userSchema);
