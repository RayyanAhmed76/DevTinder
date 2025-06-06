const express = require("express");
const app = express();

const { Adminauth, Userauth } = require("./Middlewares/auth");

app.use("/admin", Adminauth);

app.post("/user/login", (req, res) => {
  res.send("Login successful!");
});
app.get("/user/getData", Userauth, (req, res) => {
  res.send("got the data");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("Data have been recevied");
});

app.get("/admin/Deletedata", (req, res) => {
  res.send("Data have been deleted");
});

app.listen(7777, () => {
  console.log("Server is listening to port 7777 successfully");
});
