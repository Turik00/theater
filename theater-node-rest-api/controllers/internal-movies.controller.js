let Movie = require("../models/movie");

module.exports = {
  allMovies: (req, res) => {
    Movie.find((error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    });
  },

  saveMovie: (req, res) =>{

  },

  deleteMovie: (req, res) =>{

  },

  getMovie: (req, res) =>{

  }
};
