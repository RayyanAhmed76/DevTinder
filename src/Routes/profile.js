const express = require("express");
const { Userauth } = require("../Middlewares/Userauth");
const profileRouter = express.Router();

profileRouter.get("/profile", Userauth, async (req, res) => {
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

module.exports = profileRouter;
