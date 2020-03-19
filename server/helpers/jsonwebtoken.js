const { sign, verify } = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.JWT_SECRET;

const jwtSign = payload => {
  return sign(payload, secret);
};

const jwtVerify = token => {
  return verify(token, secret, (err, decoded) => {
    if (!token) return { success: false, data: { type: "missing token" } };
    if (err) return { success: false, data: { type: "JSONWEBTOKEN" } };
    else return { success: true, data: decoded };
  });
};

module.exports = { sign: jwtSign, verify: jwtVerify };
