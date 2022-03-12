const express = require("express");
const externalMovieRoute = express.Router();
const externalMoviesController = require("../controllers/external-movies.controller");

externalMovieRoute.get("/search-movies/:query/:page", function (req, res) {
  externalMoviesController
    .searchMovies(req.params.query, req.params.page)
    .then((result) => externalMoviesController.createMoviesResult(result.data))
    .then(result => externalMoviesController.checkWhichMoviesExistsInLocalDB(result.results, res))
    .catch((err) => res.status(500).send(err));
});

externalMovieRoute.get("/search-movies-autocomplete/:query/:options", function (req, res) {
  externalMoviesController
    .searchMovies(req.params.query, 1)
    .then((result) => res.status(200).send(
        externalMoviesController.createSearchAutocompleteResult(result.data, req.params.options)))
    .catch((err) => res.status(500).send(err));
});

module.exports = externalMovieRoute;
