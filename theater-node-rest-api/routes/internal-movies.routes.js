const express = require('express');
const internalMovieRoute = express.Router();
const internalMoviesController = require('../controllers/internal-movies.controller');

// Add Movie
internalMovieRoute.route('/add-movie/:movieId').post(internalMoviesController.saveMovie);

// Get Movie
internalMovieRoute.route('/get-movie/:movieId').get(internalMoviesController.getMovie);

// Get all Movies
internalMovieRoute.route('/').get(internalMoviesController.allMovies);

// Delete Movie
internalMovieRoute.route('/delete-movie/:movieId').delete(internalMoviesController.deleteMovie);

module.exports = internalMovieRoute;