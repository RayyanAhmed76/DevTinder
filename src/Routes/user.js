const express = require("express");
const { Userauth } = require("../Middlewares/Userauth");
const connectrequest = require("../models/connectionrequest");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.get("/requests/pending", Userauth, async (req, res) => {
  try {
    const loggedInuser = req.user;
    const data = await connectrequest
      .find({
        toUserid: loggedInuser._id,
        status: "interested",
      })
      .populate("fromUserid", ["firstName", "lastName", "photoURL"]);

    res.send({
      message: `connection request for ${loggedInuser.firstName}`,
      data,
    });
  } catch (error) {
    res.status(404).send({ message: "Error: " + error.message });
  }
});

userRouter.get("/collections", Userauth, async (req, res) => {
  try {
    loggedInuser = req.user;

    const connectionRequest = await connectrequest
      .find({
        $or: [
          { fromUserid: loggedInuser._id, status: "accepted" },
          { toUserid: loggedInuser._id, status: "accepted" },
        ],
      })
      .populate("fromUserid", ["firstName", "lastName", "photoURL", "about"])
      .populate("toUserid", ["firstName", "lastName", "photoURL", "about"]);

    if (!connectionRequest) {
      throw new Error("No collection of users");
    }

    const data = connectionRequest.map((row) => {
      if (row.fromUserid._id.toString() === loggedInuser._id.toString()) {
        return row.toUserid;
      } else {
        return row.fromUserid;
      }
    });
    res.send({ data: data });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

userRouter.get("/feed", Userauth, async (req, res) => {
  try {
    loggedInuser = req.user;

    const page = parseInt(req.query.page || 1);
    let limit = parseInt(req.query.limit || 10);
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequest = await connectrequest
      .find({
        $or: [{ fromUserid: loggedInuser._id }, { toUserid: loggedInuser._id }],
      })
      .select("fromUserid toUserid");

    const HiddenUserList = new Set();

    connectionRequest.forEach((request) => {
      HiddenUserList.add(request.fromUserid.toString());
      HiddenUserList.add(request.toUserid.toString());
    });

    const feed = await User.find({
      $and: [
        { _id: { $nin: Array.from(HiddenUserList) } },
        { _id: { $ne: loggedInuser._id } },
      ],
    })
      .select("firstName lastName skills photoURL ")
      .skip(skip)
      .limit(limit);

    res.send(feed);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = userRouter;
