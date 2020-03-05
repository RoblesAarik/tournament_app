// Server setup
const express = require("express");

const app = express();

const mongoose = require("mongoose");

// Middleware
mongoose.connect("mongodb://localhost:27017/sportsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// Port listener
app.listen(3000, () => {
  console.log("listening");
});
