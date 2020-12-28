const Router = require("express").Router();

const { jwtVerify } = require("../../middlewares/jwt");
const Mission = require("../../database/models/Mission");
const Set = require("../../database/models/Set");
const Team = require("../../database/models/Team");
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
    let teamId = req.jwt_payload.team;
    let team = await Team.findById(teamId);
    let set = await Set.findById(team.AssignedSet);
    res.status(200).json({ missions: set.Missions });
  } catch (e) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }

  /* res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", Buffer.byteLength(content));
  res.end(content); */
});

module.exports = Router;
