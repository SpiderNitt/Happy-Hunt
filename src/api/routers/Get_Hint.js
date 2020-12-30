const Router = require("express").Router();

const Mission = require("../../database/models/Mission");
const Activity = require("../../database/models/Activity");
const Hint = require("../../database/models/Hint")
Router.get("/", async (req, res) => {
  try {
    const { MissionId } = req.body;
    const mission = await Mission.findById(MissionId);
    const hint = mission.Hints;
    const activity = await Activity.findOne({
      team: "5fe641ef1da3c71e2c3c0222",
      mission: MissionId,
    });
    const HintNumber = activity.hintsTaken;
    if (HintNumber < 3) {
      activity.hintsTaken += 1;
      activity.save();
      let hintStatement = await Hint.findById(hint[HintNumber] )
      return res.status(200).json({ hint: hintStatement });
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
