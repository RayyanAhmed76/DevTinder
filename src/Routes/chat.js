const express = require("express");
const Chat = require("../models/chat");
const { Userauth } = require("../Middlewares/Userauth");
const chatRouter = express.Router();

chatRouter.get("/chat/:touserid", Userauth, async (req, res) => {
  const { touserid } = req.params;
  const userId = req.user._id;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, touserid] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName photoURL",
    });
    if (!chat) {
      chat = new Chat({
        participants: { $all: [userId, touserid] },
        messages: [],
      });
      await chat.save();
    }

    res.send(chat);
  } catch (error) {
    res.error(error.message);
  }
});

module.exports = chatRouter;
