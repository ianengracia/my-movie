const User = function (opt) {
  this.id = opt["id"];

  this.name = opt["name"];

  this.avatar = opt["avatar"];

  this.username = opt["username"];

  this.password = opt["password"];

  this.timestamp = opt["timestamp"];
};

module.exports = User;
