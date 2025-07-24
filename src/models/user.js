const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  firstName: {
    type: String,
    unique: true,
    minLength: 5,
    maxlength: 50,
  },
  lastName: {
    type: String,
  },
  EmailID: {
    type: String,
    unique: true,
  },
  Password: {
    type: String,
  },
  age: {
    type: Number,
    min: 18,
    max: 50,
  },
});

module.exports = mongoose.model("user", userschema);
