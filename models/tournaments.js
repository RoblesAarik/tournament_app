const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  numberOfTeams: { type: Number, default: 0 },
  location: { type: String, required: true },
  winner: { type: String, default: "In Progress" },
  teams: [
    {
      teamName: String,
      record: { type: String, default: "0-0" },
      img: String,
    },
  ],
});

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
