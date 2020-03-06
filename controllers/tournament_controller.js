// Setup
const express = require("express");
const router = express.Router();

const Tournament = require("../models/tournments.js");

//___________________
//7 Restful Routes
//___________________
// Index  : GET    '/products'          1/7
// Show   : GET    '/products/:id'      2/7
// New    : GET    '/prodcuts/new'      3/7
// Create : POST   '/products'          4/7
// Edit   : GET    '/products/:id/edit' 5/7
// Update : PUT    '/products/:id'      6/7
// Delete : DELETE '/products/:id'      7/7

// Index Route

router.get("/", (req, res) => {
  Tournament.find({}, (err, tournaments) => {
    res.render("index.ejs", { tournaments });
  });
});

module.exports = router;
