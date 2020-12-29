const Router = require("express").Router();

const Mission = require("../../database/models/Mission");
const Activity = require("../../database/models/Activity");

Router.get("/", async (req, res) => {
  try {
    const { MissionId } = req.body;
    const mission = await Mission.findById(MissionId);
    const hint = mission.Hints;
    const activity = await Activity.findOne({
      team: req.jwt_payload.team,
      mission: MissionId,
    });
    const HintNumber = activity.hintsTaken;
    if (HintNumber < 3) {
      activity.hintsTaken += 1;
      activity.save();

      return res.status(200).json({ hint: hint[HintNumber] });
    }
    return res.status(403).json({ message: "No more hints available" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});

module.exports = Router;
