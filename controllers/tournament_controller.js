// Setup
const express = require("express");
const router = express.Router();
const session = require("express-session");

const Tournament = require("../models/tournaments.js");

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
    res.render("index.ejs", {
      tournaments,
      currentUser: req.session.currentUser,
    });
  });
});

// New Route
router.get("/new", (req, res) => {
  if (req.session.currentUser) {
    res.render("new.ejs", { currentUser: req.session.currentUser });
  } else {
    res.redirect("/sessions/new");
  }
});

// Add Teams route
router.get("/:id/newteam", (req, res) => {
  Tournament.findById(req.params.id, (err, tournaments) => {
    if (req.session.currentUser) {
      res.render("teams.ejs", {
        tournaments,
        currentUser: req.session.currentUser,
      });
    } else {
      res.redirect("/sessions/new");
    }
  });
});
// Create route
router.post("/", (req, res) => {
  if (req.session.currentUser) {
    Tournament.create(req.body, (err, result) => {
      res.redirect("/tournaments");
    });
  } else {
    res.redirect("/sessions/new");
  }
});

// Seed route
router.get("/seed", (req, res) => {
  Tournament.create([
    {
      name: "LA Tournament",
      description: "Tournament in Los Angeles",
      location: "Memorial Coliseum",
      teams: [
        {
          teamName: "Loki",
          img:
            "https://i.pinimg.com/originals/b6/49/25/b64925fa5dca0ec2fd5602cc660ec78f.jpg",
        },
        {
          teamName: "Avengers",
          img:
            "https://i.pinimg.com/236x/c8/aa/e7/c8aae7ccf04ffd6914be5653bcb28fea.jpg",
        },
        {
          teamName: "Ninja Turtles",
          img:
            "https://i.pinimg.com/originals/14/74/18/147418be8fc80831e6bd2af3a6218451.jpg",
        },
      ],
    },
    {
      name: "Jousting Tournament",
      description: "Medevil Joust Tournament",
      location: "Roman Coliseum",
      teams: [
        {
          teamName: "Loki",
          img:
            "https://i.pinimg.com/originals/b6/49/25/b64925fa5dca0ec2fd5602cc660ec78f.jpg",
        },
        {
          teamName: "Avengers",
          img:
            "https://i.pinimg.com/236x/c8/aa/e7/c8aae7ccf04ffd6914be5653bcb28fea.jpg",
        },
      ],
    },
    {
      name: "Tournament of the Gods",
      description: "Gods in war",
      location: "The Heavens",
      teams: [
        {
          teamName: "Avengers",
          img:
            "https://i.pinimg.com/236x/c8/aa/e7/c8aae7ccf04ffd6914be5653bcb28fea.jpg",
        },
        {
          teamName: "Ninja Turtles",
          img:
            "https://i.pinimg.com/originals/14/74/18/147418be8fc80831e6bd2af3a6218451.jpg",
        },
      ],
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
    res.render("show.ejs", {
      tournaments: tournaments,
      currentUser: req.session.currentUser,
    });
  });
});

// Edit route
router.get("/:id/edit", (req, res) => {
  Tournament.findById(req.params.id, (err, found) => {
    if (req.session.currentUser) {
      res.render("edit.ejs", {
        tournaments: found,
        currentUser: req.session.currentUser,
      });
    } else {
      res.redirect("/sessions/new");
    }
  });
});

// Edit Team info
router.get("/teams/:id/:teamid", (req, res) => {
  Tournament.findById(req.params.id, (err, found) => {
    res.render("teamedit.ejs", {
      tournaments: found,
      teamid: found.teams[req.params.teamid],
      currentUser: req.session.currentUser,
    });
  });
});

// Add new teams into the tournaments
router.put("/:id/add", (req, res) => {
  Tournament.findByIdAndUpdate(
    req.params.id,
    {
      $push: {
        teams: req.body,
      },
      $inc: { numberOfTeams: 1 },
    },

    { new: true },
    (err, update) => {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.redirect("/tournaments");
      }
    }
  );
});

// Update teams
// router.put("/:id/:index/:teamid", (req, res) => {
//   Tournament.findByIdAndUpdate(
//     req.params.id,
//     { teams[req.params.index].req.params.id: teams },
//     {
//       $set: {
//         teamName: req.body.teamName,
//         img: req.body.img,
//         record: req.body.record,
//       },
//     }
//   );
// });

// Put / Update route
router.put("/:id/", (req, res) => {
  Tournament.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, update) => {
      res.redirect(`/tournaments/${req.params.id}`);
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
