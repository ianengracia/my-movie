const User = require("../models/user.model");

module.exports.mapResult = function (result) {
  return result.map((item) => new User(item));
};
