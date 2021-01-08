/* eslint-disable no-await-in-loop */
const Router = require("express").Router();
const { validationResult } = require("express-validator");
const Mission = require("../../database/models/Mission");

const Team = require("../../database/models/Team");
const Activity = require("../../database/models/Activity");
const Hint = require("../../database/models/Hint");
const {
  MissionValidator,
  UpdateMissionValidator,
} = require("../../middlewares/expressValidator");

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
    const teamId = req.jwt_payload.team;

    const team = await Team.findById(teamId);

    const arr = [];
    const allMissions = team.assignedMissions;

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
Router.get("/hint", async (req, res) => {
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
      const hintStatement = await Hint.findById(hint[HintNumber]);
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
Router.post("/admin/add", MissionValidator, async (req, res) => {
  try {
    const {
      Category,
      clue,
      answer_Type,
      answer,
      Location,
      Other_Info,
      Feed,
      ServerEvaluation,
      maxPoints,
      Hints,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newHints = [];

    for (let i = 0; i < Hints.length; i++) {
      const newhint = await Hint.create(Hints[i]);
      newHints.push(newhint);
    }

    const m = await Mission.create({
      Category,
      clue,
      answer_Type,
      answer,
      Location,
      Other_Info,
      maxPoints,
      Feed,
      ServerEvaluation,
      assignedTeams: [],
      Hints: newHints,
    });

    return res.status(200).json({ message: "mission added sucessfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
Router.patch("/admin/update", UpdateMissionValidator, async (req, res) => {
  try {
    const { id } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const mission = await Mission.findById(id);
    const HintsGiven = req.body.Hints;
    if (HintsGiven) {
      const hints = mission.Hints;
      for (let index = 0; index < HintsGiven.length; index++) {
        await Hint.findByIdAndUpdate(hints[index], HintsGiven[index]);
      }
    }
    delete req.body.Hints;
    delete req.body.id;
    await Mission.findByIdAndUpdate(mission._id, req.body);
    return res.status(200).json({ message: "mission updated sucessfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});

Router.delete("/admin/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const mission = await Mission.findById(id);
    const hintarr = mission.Hints;
    hintarr.forEach(async (hint) => {
      await Hint.findByIdAndDelete(hint);
    });

    mission.remove();
    return res.status(200).json({ message: "mission deleted sucessfully" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});

module.exports = Router;
