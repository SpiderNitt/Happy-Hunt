const scoreboard = require("express").Router();
const Team = require("../../database/models/Team");

scoreboard.get("/", async (req, res) => {
  try {
    const teamScore = await Team.find()
      .sort("points")
      .populate("members", "name -_id")
      .select("teamName points -_id members");
    return res.status(200).json(teamScore);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Server Error, Try again later" });
  }
});
module.exports = scoreboard;
