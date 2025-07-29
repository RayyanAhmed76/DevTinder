const express = require("express");
const { Userauth } = require("../Middlewares/Userauth");
const connectrequest = require("../models/connectionrequest");
const User = require("../models/user");
const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:touserId",
  Userauth,
  async (req, res) => {
    try {
      const fromUserid = req.user._id;
      const toUserid = req.params.touserId;
      const status = req.params.status;

      const isallowedstatus = ["ignored", "interested"];
      if (!isallowedstatus.includes(status)) {
        throw new Error("the status is wrong!");
      }

      const touser = await User.findById(toUserid);
      if (!touser) {
        throw new Error("The request you are sending to is not avaliable");
      }

      const existingrequest = await connectrequest.findOne({
        $or: [
          { fromUserid, toUserid },
          { fromUserid: toUserid, toUserid: fromUserid },
        ],
      });

      if (existingrequest) {
        throw new Error("Request alrerady exists!");
      }

      const request = new connectrequest({
        fromUserid,
        toUserid,
        status,
      });

      const data = await request.save();
      fromuser = req.user;

      res.send({
        message: `${fromuser.firstName} is ${status} in ${touser.firstName}`,
        data,
      });
    } catch (error) {
      res.status(404).send({ message: "Error: " + error.message });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  Userauth,
  async (req, res) => {
    try {
      loggedInuser = req.user;
      const status = req.params.status;
      const requestId = req.params.requestId;

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        throw new Error("The status is not correct!");
      }

      const connectionrequest = await connectrequest.findOne({
        _id: requestId,
        toUserid: loggedInuser._id,
        status: "interested",
      });
      if (!connectionrequest) {
        throw new Error("Connection request is invalid!");
      }
      connectionrequest.status = status;
      const data = await connectionrequest.save();
      res.send({ message: "Connection request " + status, data });
    } catch (error) {
      res.status(404).send({ message: "Error: " + error.message });
    }
  }
);

module.exports = requestRouter;
