const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://rayyanahmedrak:MT9AJ1gsdkziv3gJ@rayyanahmed.he6ql4y.mongodb.net/devTinder"
  );
};

module.exports = { connectDB };
