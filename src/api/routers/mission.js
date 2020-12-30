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
    const arr = [];
    const allMissions = set.Missions;
    // eslint-disable-next-line no-await-in-loop
    for (let i = 0; i < allMissions.length; i++) {
      const activity = Activity.findOne({
        team: "5fe641ef1da3c71e2c3c0222",
        mission: allMissions[i],
      });
      const mission = await Mission.findById(allMissions[i]).select({
        clue: 1,
        Category: 1,
        maxPoints: 1,
      });
      arr.push(mission);

      console.log(activity);
      if (!activity) {
        console.log("inside");
        await Activity.create({
          team: "5fe641ef1da3c71e2c3c0222",
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
