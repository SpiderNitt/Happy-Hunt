const admin = require("express").Router();
const Team = require("../../database/models/Team");
const Activity = require("../../database/models/Activity");
const Mission = require("../../database/models/Mission");

admin.post("/accept", async (req, res) => {
  const { isAccepted, activityfeedId, MissionId } = req.body;
  const team = await Team.findOne({
    id: "5fe641ef1da3c71e2c3c0222" /* req.jwt_payload.team */,
  });
  const mission = await Mission({ id: MissionId });
  const activity = await Activity.findOne({ id: activityfeedId });
  if (isAccepted) {
    team.points += mission.maxPoints - activity.hintsTaken * 20;
    activity.status = true;
    await team.save();
    await activity.save();
  } else {
    await Team.deleteOne({ id: team.id });
  }
  res.atatus(200).json({ team, mission, activity });
});

module.exports = admin;
