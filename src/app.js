const express = require("express");
const app = express();
const { connectDB } = require("./Database/database");

connectDB()
  .then(() => {
    console.log("Database has been connected sucessfully");
    app.listen(7777, () => {
      console.log("Server is listening to port 7777 successfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });
