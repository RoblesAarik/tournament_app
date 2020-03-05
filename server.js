// Server setup
const express = require("express");

const app = express();

const mongoose = require("mongoose");

// Middleware
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/sportsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// Controller middleware
// const tournamentController = require("./controllers/tournament_controller.js");

// app.use("/tournaments", tournamentController);

// Port listener
app.listen(3000, () => {
  console.log("listening");
});
