const openApi = require("express").Router();
const Team = require("../../database/models/Team");
const Mission = require("../../database/models/Mission");

openApi.get("/scoreboard", async (req, res) => {
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
openApi.get("/mission/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mission = await Mission.findById(id);
    if (!mission) {
      return res.status(404).json({ message: "Mission not found" });
    }
    return res.status(200).json(mission);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ Message: "Server Error, Try again later" });
  }
});
module.exports = openApi;
