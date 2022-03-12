const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let Movie = new Schema(
  {
    movieId: {
      type: Number,
    },
    title: {
      type: String,
    },
    overview: {
      type: String,
    },
    releaseDate: {
      type: String,
    },
    posterUrl: {
      type: String,
    },
    voteAvg: {
      type: Number,
    },
    voteCount: {
      type: Number,
    },
    language: {
      type: String,
    },
  },
  {
    collection: "movies",
  }
);
module.exports = mongoose.model("Movie", Movie);
