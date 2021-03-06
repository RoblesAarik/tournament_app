// Server setup
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(
  session({
    secret: "something", //some random string
    resave: false,
    saveUninitialized: false,
  })
);

app.use(function(req, res, next) {
  if (!req.session) {
    return next(new Error("Oh no")); //handle error
  }
  next(); //otherwise continue
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

// Controller middleware
const tournamentController = require("./controllers/tournament_controller.js");
app.use("/tournaments", tournamentController);

// wildcard route
app.get("*", (req, res) => {
  res.redirect("/tournaments");
});

// Port listener
app.listen(process.env.PORT, () => {
  console.log("listening");
});
