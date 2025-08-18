const express = require("express");
const app = express();
require("dotenv").config();
const { connectDB } = require("./Database/database");
const User = require("./models/user");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { Userauth } = require("./Middlewares/Userauth");
const authRouter = require("./Routes/auth");
const profileRouter = require("./Routes/profile");
const requestRouter = require("./Routes/request");
const userRouter = require("./Routes/user");
const chatRouter = require("./Routes/chat");
const http = require("http");
const cors = require("cors");
const { Server } = require("net");
const intializeSocket = require("./utils/socketio");

app.use(express.json());
app.use(cookieparser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);

const server = http.createServer(app);
intializeSocket(server);

connectDB()
  .then(() => {
    console.log("Database has been connected sucessfully");
    server.listen(process.env.port, () => {
      console.log("Server is listening to port 7777 successfully");
    });
  })
  .catch((err) => {
    console.log(err);
  });
