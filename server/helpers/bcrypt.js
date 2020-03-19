const { genSaltSync, hashSync, compareSync } = require("bcryptjs");

const hashPassword = password => {
  const saltRounds = 10;
  const salt = genSaltSync(saltRounds);
  return hashSync(password, salt);
};

const comparePassword = (password, hashedPassword) => {
  return compareSync(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
