const express = require("express");
const app = express();
const { connectDB } = require("./Database/database");
const User = require("./models/user");
app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Rayyan",
    lastname: "Ahmed",
    EmailID: "Rayyanahmedrak@gmail.com",
    Password: "Rayyanrak12+",
    age: 21,
  });

  try {
    await user.save();
    res.send("User has been added successfully!");
  } catch {
    res.status(400).send("Error whle saving data" + err.message);
  }
});
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
