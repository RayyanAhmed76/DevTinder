const express = require("express");
const app = express();
const { connectDB } = require("./Database/database");
const User = require("./models/user");
app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User has been added successfully!");
  } catch {
    res.status(400).send("Error whle saving data" + err.message);
  }
});

// getting user from database on the basis of email id
app.get("/user", async (req, res) => {
  const useremail = req.body.EmailID;

  const users = await User.find({ EmailID: useremail });
  try {
    if (users === 0) {
      res.status(404).send("user not found!");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(404).send("something went wrong!");
  }
});

app.get("/feed", async (req, res) => {
  const users = await User.find({});
  try {
    if (users === 0) {
      res.status(404).send("No data found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.send("Something went wrong!");
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
