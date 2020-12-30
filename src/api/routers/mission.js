const Router = require("express").Router();

const { jwtVerify } = require("../../middlewares/jwt");
const Mission = require("../../database/models/Mission");
const Set = require("../../database/models/Set");
const Team = require("../../database/models/Team");
const Activity = require("../../database/models/Activity");

Router.get("/admin", async (req, res) => {
  try {
    const TotalMissions = await Mission.find({});
    return res.status(200).json({ Missions: TotalMissions });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
Router.get("/player/", async (req, res) => {
  try {
    const teamId = "5fe641ef1da3c71e2c3c0222";
    const team = await Team.findById(teamId);

    const set = await Set.findById(team.AssignedSet);
    let arr = [];
    let allMissions = set.Missions;
    for (let i = 0; i < allMissions.length; i++) {
      let mission = await Mission.findById(allMissions[i]);
      arr.push(mission);
      await Activity.create({});
    }

    res.status(200).json({ missions: set.Missions });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});

module.exports = Router;
