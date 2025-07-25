const validator = require("validator");

const infochecker = (req) => {
  const {
    firstName,
    lastName,
    EmailID,
    Password,
    age,
    about,
    PhotoURL,
    skills,
    gender,
  } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid!");
  } else if (!validator.isEmail(EmailID)) {
    throw new Error("Emailid is not valid!");
  } else if (!validator.isStrongPassword(Password)) {
    throw new Error("Enter a strong password");
  }
};

module.exports = { infochecker };
