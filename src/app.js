const express = require("express");
const app = express();

app.use("/",(req,res)=>{
  res.send("You're in Home page")
})

app.use("/test", (req, res) => {
  res.send("You're in Test page");
});

app.use("/h", (req, res) => {
  res.send("You're in Hello page");
});

app.listen(7777, () => {
  console.log("Server is listening to port 7777 successfully");
});
