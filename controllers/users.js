// Setup
const express = require("express");
const router = express.Router();

// Access user model
const User = require("../models/users.js");

const bcrypt = require("bcrypt");

router.get("/new", (req, res) => {
  res.render("users/new.ejs");
});

// Uses bcryt to encrypt password, prevents hacked passwords
router.post("/", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  //   Creates new user in DB
  User.create(req.body, (err, createdUser) => {
    res.redirect("/");
  });
});

module.exports = router;
