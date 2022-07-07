const movieRepository = require("../repository/movie.repository");
const movieRatingRepository = require("../repository/movie-rating.repository");

const WebResponse = require("../models/web-response.model");

const findAll = async () => {
  try {
    const movies = await movieRepository.findAll();

    return new WebResponse(200, movies, "Ok!");
  } catch (err) {
    console.error(err);
    return new WebResponse(500);
  }
};

const findAllContainingTitle = async (title) => {
  try {
    const movies = await movieRepository.findAllContainingTitle(title);

    return new WebResponse(200, movies, "Ok!");
  } catch (err) {
    console.error(err);
    return new WebResponse(500);
  }
};

const findById = async (id) => {
  try {
    const movie = await movieRepository.findById(id);

    return new WebResponse(200, movie, "Ok!");
  } catch (err) {
    console.error(err);
    return new WebResponse(500);
  }
};

const save = async (movie) => {
  try {
    let savedMovie = null;

    //check if save is for update
    if (movie.hasOwnProperty("id") && movie.id) savedMovie = await movieRepository.update(movie);
    //else do insert
    else savedMovie = await movieRepository.insert(movie);

    return new WebResponse(200, savedMovie, "Ok!");
  } catch (err) {
    console.error(err);
    return new WebResponse(500);
  }
};

const deleteMovie = async (movieId) => {
  try {
    const isDeleted = await movieRepository.deleteByMovieId(movieId);

    return new WebResponse(200, isDeleted, "Ok!");
  } catch (err) {
    console.error(err);
    return new WebResponse(500);
  }
};

const findAllByUserId = async (userId) => {
  try {
    const movies = await movieRepository.findAllByUserId(userId);

    return new WebResponse(200, movies, "Ok!");
  } catch (err) {
    console.error(err);
    return new WebResponse(500);
  }
};

const rateMovie = async (rating) => {
  try {
    let savedRating = null;

    //check if save is for update
    if (rating.hasOwnProperty("id") && rating.id) savedRating = await movieRatingRepository.update(rating);
    //else do insert
    else savedRating = await movieRatingRepository.insert(rating);

    return new WebResponse(200, savedRating, "Ok!");
  } catch (err) {
    console.error(err);
    return new WebResponse(500);
  }
};

module.exports = {
  findAll,
  findAllContainingTitle,
  findById,
  save,
  deleteMovie,
  findAllByUserId,
  rateMovie,
};
