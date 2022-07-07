const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const SECRET_KEY = process.env.JWT_SECRET_KEY;

const generate = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "30d" });
};

const hashPassword = async (password) => await bcrypt.hash(password, 12);

const matchPasswords = async (password, savedPassword) => {
  return await bcrypt.compare(password, savedPassword);
};

module.exports = {
  generate,
  hashPassword,
  matchPasswords,
};
