const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  EmailID: {
    type: String,
  },
  Password: {
    type: String,
  },
  age: {
    type: Number,
  },
});

module.exports = mongoose.model("user", userschema);
