// Setup
const express = require("express");
const router = express.Router();
const session = require("express-session");

const Tournament = require("../models/tournments.js");

const Team = require("../models/teams.js");
//___________________
//7 Restful Routes
//___________________
// Index  : GET    '/products'          1/7 X
// Show   : GET    '/products/:id'      2/7 X
// New    : GET    '/prodcuts/new'      3/7 X
// Create : POST   '/products'          4/7 X
// Edit   : GET    '/products/:id/edit' 5/7 X
// Update : PUT    '/products/:id'      6/7 X
// Delete : DELETE '/products/:id'      7/7 X

// Index Route

router.get("/", (req, res) => {
  Tournament.find({}, (err, tournaments) => {
    res.render("index.ejs", { tournaments });
  });
});

router.get("/", (req, res) => {
  res.render("index.ejs", {
    currentUser: req.session.currentUser,
  });
});

// New Route
router.get("/new", (req, res) => {
  res.render("new.ejs");
});
// Create route
router.post("/", (req, res) => {
  Tournament.create(req.body, (err, result) => {
    res.redirect("/tournaments");
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

router.get("/seed2", (req, res) => {
  Team.create(
    {
      name: "Loki",
      img:
        "https://i.pinimg.com/originals/b6/49/25/b64925fa5dca0ec2fd5602cc660ec78f.jpg",
    },
    {
      name: "Avengers",
      img:
        "https://i.pinimg.com/236x/c8/aa/e7/c8aae7ccf04ffd6914be5653bcb28fea.jpg",
    },
    {
      name: "Ninja Turtles",
      img:
        "https://i.pinimg.com/originals/14/74/18/147418be8fc80831e6bd2af3a6218451.jpg",
    }
  );
  res.redirect("/");
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

// Edit route
router.get("/:id/edit", (req, res) => {
  Tournament.findById(req.params.id, (err, found) => {
    res.render("edit.ejs", {
      tournaments: found,
    });
  });
});

// Put / Update route
router.put("/:id", (req, res) => {
  Tournament.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, update) => {
      res.redirect("/tournaments");
    }
  );
});

// Delete Route
router.delete("/:id", (req, res) => {
  Tournament.findByIdAndDelete(req.params.id, (err, data) => {
    res.redirect("/tournaments");
  });
});

module.exports = router;
