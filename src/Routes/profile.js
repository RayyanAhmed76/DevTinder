const express = require("express");
const { Userauth } = require("../Middlewares/Userauth");
const { isallowededitfield } = require("../utils/validation");
const profileRouter = express.Router();

profileRouter.get("/profile/view", Userauth, async (req, res) => {
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

profileRouter.patch("/profile/edit", Userauth, async (req, res) => {
  try {
    const canEdit = isallowededitfield(req);
    if (!canEdit) {
      throw new Error("Cannot edit it");
    }
    const loggeduser = req.user;
    Object.keys(req.body).forEach(
      (field) => (loggeduser[field] = req.body[field])
    );
    await loggeduser.save();
    res.json({
      message: `${loggeduser.firstName}, your profile data have been edited`,
      data: loggeduser,
    });
  } catch (error) {
    res.status(404).send("Error: " + error.message);
  }
});

module.exports = profileRouter;
