const MovieRating = function (opt) {
  this.id = Number(opt["id"]);

  this.movieId = Number(opt["movie_id"]) || Number(opt["movieId"]);

  this.userId = Number(opt["user_id"]) || Number(opt["userId"]);

  this.rating = Number(opt["rating"]);

  this.timestamp = opt["timestamp"];
};

module.exports = MovieRating;
