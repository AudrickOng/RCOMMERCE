const { verify } = require("../helpers/jsonwebtoken");
const User = require("../models/user");

const authentication = async (req, res, next) => {
  const { token } = req.headers;
  const { success, data } = verify(token);
  if (success) {
    const { username } = data;
    try {
      const user = await User.findOne({ username });
      if (user && user.username == username) {
        req.session.user = user;
        next();
      } else {
        next({ type: "unauthenticated" });
      }
    } catch (e) {
      next({ type: "login", error: e });
    }
  } else {
    next({ type: data.type });
  }
};

const authorization = async (req, res, next) => {
  const { role } = req.session.user;
  if (role == "admin" || role == "owner") {
    next();
  } else {
    next({ type: "unauthorized" });
  }
};

module.exports = { authentication, authorization };
