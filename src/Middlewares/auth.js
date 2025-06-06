const Adminauth = (req, res, next) => {
  const token = "xyz";
  const isAuthorauthorized = token === "xyz";
  if (!isAuthorauthorized) {
    res.status(401).send("unauthorized");
  } else {
    next();
  }
};

const Userauth = (req, res, next) => {
  const token = "xyz";
  const isAuthorauthorized = token === "xyz";
  if (!isAuthorauthorized) {
    res.status(401).send("unauthorized");
  } else {
    next();
  }
};

module.exports = { Adminauth, Userauth };
