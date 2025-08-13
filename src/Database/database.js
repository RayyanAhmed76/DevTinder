const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(process.env.Database_key);
};

module.exports = { connectDB };
