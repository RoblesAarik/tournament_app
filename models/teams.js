const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String },
  record: { type: String, default: "0 - 0" },
});

const Team = mongoose.model("Teams", teamSchema);

module.exports = Team;
