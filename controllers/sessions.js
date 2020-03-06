// Setup
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Access user model
const User = require("../models/users.js");

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs");
});

router.post("/", (req, res) => {
  // Looks for username in DB
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    //   When username is found, compares the password that was input
    //   to the one in the DB. If its correct redirect to "/"
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.redirect("/");
    } else {
      res.send("Incorrect Password");
    }
  });
});

// When use logs out or session ends redirect to "/" and delete cookie
router.delete("/", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
