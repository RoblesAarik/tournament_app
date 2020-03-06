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

// Seed route
router.get("/seed", (req, res) => {
  Tournament.create([
    {
      name: "LA Tournament",
      description: "Tournament in Los Angeles",
      numberOfTeams: 10,
    },
    {
      name: "Jousting Tournament",
      description: "Medevil Joust Tournament",
      numberOfTeams: 8,
    },
    {
      name: "Tournament of the Gods",
      description: "Gods in war",
      numberOfTeams: 100,
    },
  ]);
  res.redirect("/tournaments");
});

// Show Route
router.get("/:id", (req, res) => {
  Tournament.findById(req.params.id, (err, tournaments) => {
    if (err) {
      console.log(err);
    }
    res.render("show.ejs", { tournaments: tournaments });
  });
});

module.exports = router;
