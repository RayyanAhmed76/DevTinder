const express = require("express");
const { Userauth } = require("../Middlewares/Userauth");
const connectrequest = require("../models/connectionrequest");

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

      res.send({ message: `Request was send successfully!!`, data });
    } catch (error) {
      res.status(404).send({ message: "Error: " + error.message });
    }
  }
);

module.exports = requestRouter;
