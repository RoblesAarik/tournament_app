const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  numberOfTeams: { type: Number, default: 4 },
  winner: { type: String, default: "In Progress" },
});

const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
