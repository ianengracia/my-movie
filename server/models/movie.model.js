const User = require("./user.model");
const MovieRating = require("./movie-rating.model");

const commonUtil = require("../utils/common.util");

const Movie = function (opt) {
  this.id = opt["id"];

  this.title = opt["title"];

  this.releaseDate = opt["release_date"] || opt["releaseDate"];

  this.runtime = opt["runtime"] && Number(opt["runtime"]);

  this.country = opt["country"];

  this.genre = opt["genre"];

  this.production = opt["production"];

  this.director = opt["director"];

  this.cast = opt["cast"];

  this.poster = opt["poster"];

  this.summary = opt["summary"];

  this.user = new User({ id: opt["user_id"], name: opt["user_name"] });

  this.ratings = extractRatings(opt["ratings"], this.id);

  this.overallRating = commonUtil.calculateOverallRating(this.ratings);

  this.timestamp = opt["timestamp"];
};

function extractRatings(ratingsString, movieId) {
  if (!ratingsString) return [];

  const ratings = ratingsString.split(",").map((r) => {
    const [id, userId, rating] = r.split("=");

    return new MovieRating({ id, movie_id: movieId, user_id: userId, rating });
  });

  return ratings;
}

module.exports = Movie;
