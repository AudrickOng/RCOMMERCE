const User = require("../models/user.js");
const { hashPassword, comparePassword } = require("../helpers/bcrypt.js");
const { sign, verify } = require("../helpers/jsonwebtoken.js");
const {
  verifyLoginValidity,
  verifyRegisterValidity
} = require("../functions/user.js");

class UserController {
  static async register(req, res, next) {
    const { username, email, password } = req.body;
    const { valid, message } = verifyRegisterValidity({
      username,
      email,
      password
    });
    const { role } = req.query;
    if (valid) {
      const data = {
        username,
        email,
        password: hashPassword(password),
        cart: [],
        role: role || "customer"
      };
      try {
        await User.create(data);
        const payload = {
          username: data.username,
          cart: data.cart,
          role: data.role
        };
        const token = sign(payload);
        res.status(201).json({ token, message: "Successfully registered!" });
      } catch (e) {
        next({ type: "register", error: e });
      }
    } else {
      next({ status: 400, message });
    }
  }
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const { valid, message } = verifyLoginValidity({
        email,
        password
      });
      if (valid) {
        const user = await User.findOne({ email });
        if (user && comparePassword(password, user.password)) {
          const payload = {
            username: user.username,
            cart: user.cart,
            role: user.role
          };
          const token = sign(payload);
          res.status(200).json({ token, message: "Successfully logged in!" });
        } else {
          next({ status: 400, message: "Incorrect email / password" });
        }
      } else {
        next({ status: 400, message });
      }
    } catch (e) {
      console.log(e);
      next({ type: "login" });
    }
  }
  static async refresh(req, res, next) {
    const { token } = req.body;
    if (!token) next({ type: "missing token" });
    const { success, data } = verify(token);
    if (success) {
      try {
        const user = await User.findOne({ username: data.username });
        if (user) {
          res.status(200).json({ token, message: "Successfully logged in!" });
        } else {
          next({ status: 400, message: "User does not exist" });
        }
      } catch (e) {
        next({ type: "refresh" });
      }
    } else {
      next({ type: data.type });
    }
  }
}

module.exports = UserController;
