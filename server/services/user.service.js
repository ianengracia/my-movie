const userRepository = require("../repository/user.repository");

const WebResponse = require("../models/web-response.model");
const User = require("../models/user.model");

const tokenUtil = require("../utils/token.util");
const avatarUtil = require("../utils/avatar.util");
const messageConstants = require("../contants/messages.contant");

const findByUsername = async (username) => {
  try {
    const user = await userRepository.findByUsername(username);

    return user;
  } catch (err) {
    console.error(err);
    return null;
  }
};

const register = async (user) => {
  try {
    const { name, username, password } = user;
    const oldUser = await userRepository.findByUsername(username);

    if (oldUser) return new WebResponse(400, "User already exists!");

    const hashedPassword = await tokenUtil.hashPassword(password);
    const avatar = avatarUtil.generate(name);

    const newUser = new User({ name, avatar, username, password: hashedPassword });

    const savedUser = await userRepository.save(newUser);

    return new WebResponse(201, savedUser, "User created!");
  } catch (err) {
    console.error(err);
    return new WebResponse(500);
  }
};

const login = async (username, password) => {
  try {
    if (!username || !password) return new WebResponse(400, "Please enter username and password.");

    const user = await userRepository.findByUsername(username);

    if (!user) return new WebResponse(400, messageConstants.AUTHENTICATION_FAILURE);

    const passwordsMatched = await tokenUtil.matchPasswords(password, user.password);

    if (!passwordsMatched) return new WebResponse(404, messageConstants.AUTHENTICATION_FAILURE);

    delete user.password;

    const token = tokenUtil.generate({ user });

    return new WebResponse(200, { user, token }, "Authenticated");
  } catch (err) {
    console.error(err);
    return new WebResponse(500);
  }
};

module.exports = {
  register,
  findByUsername,
  login,
};
