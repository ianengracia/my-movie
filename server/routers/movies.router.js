const express = require("express");
const passportConfig = require("../config/passport.config");

const router = express.Router();

const moviesController = require("../controllers/movies.controller");

//get all movies
router.get("", moviesController.movies);

//search movie (s)
router.get("/search", moviesController.search);

//add new movie
router.post("", passportConfig.authorize, moviesController.addMovie);

//update movie
router.patch("", passportConfig.authorize, moviesController.updateMovie);

//delete movie
router.delete("", passportConfig.authorize, moviesController.deleteMovie);

//get details of a movie
router.get("/details", moviesController.details);

//rate movie
router.patch("/rate", passportConfig.authorize, moviesController.rate);

//get all movies added by user
router.get("/user", passportConfig.authorize, moviesController.userMovies);

module.exports = router;
