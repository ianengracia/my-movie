const MovieRating = require("../models/movie-rating.model");

module.exports.mapResult = function (result) {
  return result.map((item) => new MovieRating(item));
};
