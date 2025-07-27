const express = require("express");
const { Userauth } = require("../Middlewares/Userauth");

const requestRouter = express.Router();

requestRouter.post("/sendconnectionrequest", Userauth, async (req, res) => {
  const user = req.user;
  res.send(
    "A connection request is sended by " +
      user.firstName +
      " would you like to accept it?"
  );
});

module.exports = requestRouter;
