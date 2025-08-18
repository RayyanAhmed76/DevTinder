const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const chatScehma = new mongoose.Schema({
  participants: [
    { type: mongoose.Schema.Types.ObjectId, required: true, ref: "user" },
  ],
  messages: [messageSchema],
});

module.exports = mongoose.model("Chat", chatScehma);
