const express = require("express");
const app = express();
const { connectDB } = require("./Database/database");
const User = require("./models/user");
const { infochecker } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { Userauth } = require("./Middlewares/auth");

app.use(express.json());
app.use(cookieparser());
//adding a user
app.post("/signup", async (req, res) => {
  try {
    const { Password } = req.body;
    //valdiation of data
    infochecker(req);

    //encrypting the password
    if (req.body.Password) {
      req.body.Password = await bcrypt.hash(Password, 10);
    }

    const user = new User(req.body);
    await user.save();
    res.send("User has been added successfully!");
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

app.post("/login", async (req, res) => {
  const { EmailID, Password } = req.body;
  try {
    const user = await User.findOne({ EmailID: EmailID });
    if (!user) {
      throw new Error("Invalid credentials!");
    }
    const passwordchecker = await user.validatePasswordd(Password);
    if (!passwordchecker) {
      throw new Error("Invalid credentials!");
    } else {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("login sucessfull!!");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.get("/profile", Userauth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("user not found!login in again");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.post("/sendconnectionrequest", Userauth, async (req, res) => {
  const user = req.user;
  res.send(
    "A connection request is sended by " +
      user.firstName +
      " would you like to accept it?"
  );
});
// getting user from database on the basis of email id
app.get("/user", async (req, res) => {
  const emailid = req.body.EmailID;

  try {
    const user = await User.findOne({ EmailID: emailid });
    if (user === 0) {
      res.send("User not found!");
    } else {
      res.send(user);
    }
  } catch (error) {
    res.send(error);
  }
});
// getting all data from the database
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

//deleteing the data by finding through the id
app.delete("/delete", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deleteduser = await User.findByIdAndDelete(userId);
    res.send(deleteduser);
  } catch (error) {
    res.send(error);
  }
});

//updating a user
app.patch("/updateuser/:userId", async (req, res) => {
  const data = req.body;
  const userId = req.params?.userId;

  try {
    IsAllowed = [
      "firstName",
      "lastName",
      "gender",
      "Password",
      "age",
      "about",
      "skills",
    ];

    const isupdateallowed = Object.keys(data).every((k) =>
      IsAllowed.includes(k)
    );
    if (!isupdateallowed) {
      throw new Error("Update not allowed");
    }
    if (data.skills && data?.skills.length > 12) {
      throw new Error("Skills should not exceed more than 12");
    }
    await User.findByIdAndUpdate(userId, data, { runValidators: true });
    res.send("data updated succesfully");
  } catch (error) {
    res.status(404).send("Error" + error.message);
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
