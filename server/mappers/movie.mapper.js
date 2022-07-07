const Movie = require("../models/movie.model");

module.exports.mapResult = function (result) {
  return result.map((item) => new Movie(item));
};
