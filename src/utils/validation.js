const validator = require("validator");
//validator
console.log("validator");
const signupinfovalidator = (req) => {
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

const isallowededitfield = (req) => {
  editablefield = [
    "firstName",
    "lastName",
    "age",
    "about",
    "photoURL",
    "gender",
    "skills",
  ];

  const isallowededitablefield = Object.keys(req.body).every((k) =>
    editablefield.includes(k)
  );

  return isallowededitablefield;
};

module.exports = { signupinfovalidator, isallowededitfield };
