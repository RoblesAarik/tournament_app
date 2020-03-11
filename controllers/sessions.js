const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

const User = require("../models/users.js");

router.get("/new", (req, res) => {
  res.render("sessions/new.ejs", { currentUser: req.session.currentUser });
});

router.post("/", (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.currentUser = foundUser;
      res.redirect("/tournaments");
    } else {
      res.send("wrong password");
    }
  });
});

router.delete("/", (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/sessions/new");
    }
  });
});

module.exports = router;
