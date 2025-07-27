const express = require("express");
const authRouter = express.Router();
const { infochecker } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
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

module.exports = authRouter;
