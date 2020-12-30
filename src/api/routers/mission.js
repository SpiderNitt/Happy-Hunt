const Router = require("express").Router();

const { jwtVerify } = require("../../middlewares/jwt");
const Mission = require("../../database/models/Mission");
const Set = require("../../database/models/Set");
const Team = require("../../database/models/Team");
const Activity = require("../../database/models/Activity");
const User = require("../../database/models/User");

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
Router.get("/player/", jwtVerify, async (req, res) => {
  try {
    const teamId = req.jwt_payload.team;

    const team = await Team.findById(teamId);

    const set = await Set.findById(team.AssignedSet);
    console.log(set._id);
    const arr = [];
    const allMissions = set.Missions;
    // eslint-disable-next-line no-await-in-loop
    for (let i = 0; i < allMissions.length; i++) {
      const activity = await Activity.findOne({
        team: req.jwt_payload.team,
        mission: allMissions[i],
      });

      const mission = await Mission.findById(allMissions[i]).select({
        clue: 1,
        Category: 1,
        maxPoints: 1,
      });
      arr.push(mission);

      if (!activity) {
        await Activity.create({
          team: req.jwt_payload.team,
          ShouldBeShown: false,
          likes: 0,
          mission: allMissions[i],

          hintsTaken: 0,
        });
      }
    }

    return res.status(200).json({ missions: arr });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});

module.exports = Router;
