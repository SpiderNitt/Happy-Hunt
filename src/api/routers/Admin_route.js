const admin = require("express").Router();
const Team = require("../../database/models/Team");
const Activity = require("../../database/models/Activity");
const Mission = require("../../database/models/Mission");

admin.post("/accept", async (req, res) => {
  try {
    const { isAccepted, activityfeedId } = req.body;
    const activity = await Activity.findById(activityfeedId).populate('team').exec()
    const mission = await Mission.findById(activity.mission);
    const team = await Team.findById(activity.team._id);
    console.log();
    
    if (isAccepted) {
      console.log(mission.maxPoints , " - ",activity.hintsTaken );
      team.points += mission.maxPoints - activity.hintsTaken * 20;
      activity.status = true;
      await team.save();
      await activity.save();
    } else {
      await activity.deleteOne({ id: activityfeedId});
    }
    res.status(200).json({ message: 'Answered successfully accepted' });
  } catch (error) {
    res.status(500).json({ message: error.message})
    console.log(error);
  }

});

module.exports = admin;
