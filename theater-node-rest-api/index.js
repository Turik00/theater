const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoDb = require("./db/db");
const internalMovieRoute = require('./routes/internal-movies.routes');
const externalMovieRoute = require('./routes/external-movies.routes');

mongoose.connect(mongoDb.db, { useNewUrlParser: true }).then(
  () => {
    console.log("Database sucessfully connected ");
  },
  (error) => {
    console.log("Database error: " + error);
  }
);

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());

app.use('/internal-movies', internalMovieRoute);
app.use('/external-movies', externalMovieRoute);

// Base Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

const port = 8000;
app.listen(port, () => {
  console.log("Listening on port " + port);
});
