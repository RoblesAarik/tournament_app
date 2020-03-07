// Server setup
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

mongoose.connect("mongodb://localhost:27017/sportsdb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// Controller middleware
const tournamentController = require("./controllers/tournament_controller.js");

app.use("/tournaments", tournamentController);

// ROUTES
app.get("/", (req, res) => {
  res.render("index.ejs", {
    currentUser: req.session.currentUser,
  });
});

const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

// Port listener
app.listen(3000, () => {
  console.log("listening");
});
