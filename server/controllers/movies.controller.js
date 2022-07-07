const WebResponse = require("../models/web-response.model");
const Movie = require("../models/movie.model");

const movieService = require("../services/movie.service");
const MovieRating = require("../models/movie-rating.model");

const movies = async (req, res, next) => {
  const response = await movieService.findAll();

  res.json(response);
};

const search = async (req, res, next) => {
  let response = null;

  const title = req.query.t;

  if (!title) response = new WebResponse(400, "Missing parameter {t}.");
  else response = await movieService.findAllContainingTitle(title);

  res.json(response);
};

const addMovie = async (req, res, next) => {
  const user = req.user;
  const movie = { ...req.body, user_id: user.id };

  const newMovie = new Movie(movie);

  const response = await movieService.save(newMovie);

  res.json(response);
};

const updateMovie = async (req, res, next) => {
  const user = req.user;
  const movie = { ...req.body, user_id: user.id };

  const newMovie = new Movie(movie);

  const response = await movieService.save(newMovie);

  res.json(response);
};

const deleteMovie = async (req, res, next) => {
  let response = null;
  const id = req.query.id;

  if (!id) response = new WebResponse(400, "Missing parameter {id}.");
  else response = await movieService.deleteMovie(id);

  res.json(response);
};

const details = async (req, res, next) => {
  let response = null;
  const id = req.query.id;

  if (!id) response = new WebResponse(400, "Missing parameter {id}.");
  else response = await movieService.findById(id);

  res.json(response);
};

const rate = async (req, res, next) => {
  const user = req.user;
  const rating = { ...req.body, user_id: user.id };

  const newRating = new MovieRating(rating);

  const response = await movieService.rateMovie(newRating);

  res.json(response);
};

const userMovies = async (req, res, next) => {
  const user = req.user;
  const response = await movieService.findAllByUserId(user.id);

  res.json(response);
};

module.exports = {
  movies,
  search,
  addMovie,
  updateMovie,
  deleteMovie,
  details,
  rate,
  userMovies,
};
