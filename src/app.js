const express = require("express");
const app = express();
app.use(
  "/user",
  (req, res, next) => {
    console.log("In the first responce");
    next();
  },
  (req, res) => {
    console.log("In the second responce");
    res.send("2nd responce");
  }
);

app.listen(7777, () => {
  console.log("Server is listening to port 7777 successfully");
});
