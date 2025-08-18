const socket = require("socket.io");
const Chat = require("../models/chat");

const intializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinchat", ({ Firstname, userId, touserid }) => {
      const roomId = [userId, touserid].sort().join("_");
      console.log(Firstname + " joined room " + roomId);
      socket.join(roomId);
    }),
      socket.on(
        "sendMessage",
        async ({ Firstname, userId, touserid, text }) => {
          try {
            const roomId = [userId, touserid].sort().join("_");
            console.log(Firstname + text);
            let chat = await Chat.findOne({
              participants: { $all: [userId, touserid] },
            });

            if (!chat) {
              chat = new Chat({
                participants: [userId, touserid],
                messages: [],
              });
            }

            chat.messages.push({
              senderId: userId,
              text,
            });

            await chat.save();
            io.to(roomId).emit("messagereceived", {
              Firstname,
              text,
            });
          } catch (error) {
            console.log(error);
          }
        }
      ),
      socket.on("disconnect", () => {});
  });
};

module.exports = intializeSocket;
