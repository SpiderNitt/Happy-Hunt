const scoreboard = require("express").Router();
const Team = require("../../database/models/Team");

scoreboard.get("/", async (req, res) => {
  try {
    const teamScore = await Team.find().sort("Points");
    return res.status(200).json(teamScore);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Server Error, Try again later" });
  }
});
module.exports = scoreboard;
