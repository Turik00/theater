const Movie = require("../models/movie");

module.exports = {
  allMovies: (req, res, next) => {
    Movie.find((error, movies) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json(movies);
      }
    });
  },

  saveMovie: (req, res, next) => {
    const query = {movieId: req.params.movieId};
    const options = { upsert: true, new: true};
    Movie.findOneAndUpdate(query, req.body, options, function(error, result) {
      if (error) {
        return next(error);
      } else {
        res.status(200).json(result);
      }
  });
  },

  deleteMovie: (req, res, next) => {
    Movie.findOneAndDelete({movieId: req.params.movieId}, (error, result) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json(result);
      }
    })
  },

  getMovie: (req, res, next) => {
    Movie.find({ movieId: req.params.movieId }, function (error, movie) {
      if (error) {
        return next(error);
      } else {
        res.status(200).json(movie);
      }
    });
  },
};
