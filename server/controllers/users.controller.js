const WebResponse = require("../models/web-response.model");
const userService = require("../services/user.service");

const register = async (req, res, next) => {
  const response = await userService.register(req.body);

  res.json(response);
};

const login = async (req, res, next) => {
  const user = req.body;

  const response = await userService.login(user.username, user.password);

  res.json(response);
};

const profile = async (req, res, next) => {
  res.json(new WebResponse(200, req.user, "Ok"));
};

module.exports = {
  register,
  login,
  profile,
};
