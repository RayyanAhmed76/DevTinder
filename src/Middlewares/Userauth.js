const jwt = require("jsonwebtoken");
const User = require("../models/user");

const Userauth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      throw new Error("Invalid Token!");
    }
    const decodedmessage = await jwt.verify(token, "Bling@690");
    const { _id } = decodedmessage;
    const user = await User.findById({ _id });
    if (!user) {
      throw new Error("user not found!login in again");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
};

module.exports = { Userauth };
