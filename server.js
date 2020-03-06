// Server setup
const express = require("express");

const app = express();

const mongoose = require("mongoose");

const session = require("express-session");

// Middleware
app.use(express.urlencoded({ extended: true }));

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

app.get("/", (req, res) => {
  res.redirect("/tournaments");
});

const usersController = require("./controllers/users.js");
app.use("/users", usersController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

// Port listener
app.listen(3000, () => {
  console.log("listening");
});
