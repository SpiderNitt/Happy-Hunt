/* eslint-disable no-await-in-loop */
const Router = require("express").Router();
const { validationResult } = require("express-validator");
const multer = require("multer");
const Mission = require("../../database/models/Mission");

const Hint = require("../../database/models/Hint");
const {
  MissionValidator,
  UpdateMissionValidator,
} = require("../../middlewares/expressValidator");
const { adminVerify, superAdminVerify } = require("../../middlewares/role");

Router.get("/", adminVerify, async (req, res) => {
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

Router.post(
  "/add",
  multer({ storage: multer.memoryStorage() }).array("Photos", 2),
  MissionValidator,
  superAdminVerify,

  async (req, res) => {
    try {
      const {
        Category,
        statement,
        isBonus,
        answer_Type,
        answer,
        Location,
        Other_Info,
        MissionName,
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

      for (let i = 0; i < Hints.length; i += 1) {
        const newhint = await Hint.create(Hints[i]);
        newHints.push(newhint);
      }
      const mediaFiles = [];
      if (req.files) {
        for (let x = 0; x < req.files.length; x += 1) {
          const basefile = req.files[x].buffer.toString("base64");
          mediaFiles.push(basefile);
        }
      }
      const clue = [];

      for (let index = 0; index < statement.length; index += 1) {
        const clueObj = {};
        clueObj.text = statement[index];
        clueObj.photos = "";
        clue.push(clueObj);
      }
      if (mediaFiles.length !== 0) {
        for (let l = 0; l < mediaFiles.length; l += 1) {
          clue[l].photos = mediaFiles[l];
        }
      }

      await Mission.create({
        Category,
        clue,
        answer_Type,
        answer,
        isBonus,
        Location,
        Other_Info,
        maxPoints,
        MissionName,
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
  }
);
Router.patch(
  "/update",
  superAdminVerify,
  UpdateMissionValidator,
  multer({ storage: multer.memoryStorage() }).array("Photos", 2),

  async (req, res) => {
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

        for (let index = 0; index < HintsGiven.length; index += 1) {
          await Hint.findByIdAndUpdate(hints[index], HintsGiven[index]);
        }
      }
      const mediaFiles = [];
      if (req.files) {
        for (let x = 0; x < req.files.length; x += 1) {
          const basefile = req.files[x].buffer.toString("base64");
          mediaFiles.push(basefile);
        }
      }
      const clueArray = [];
      const { clue } = req.body;
      for (let index = 0; index < clue.length; index += 1) {
        const clueObj = {};
        clueObj.text = clue[index];
        clueObj.photos = "";
        clueArray.push(clueObj);
      }
      if (mediaFiles.length !== 0) {
        for (let index = 0; index < mediaFiles.length; index += 1) {
          clueArray[index].photos = mediaFiles[index];
        }
      }
      req.body.clue = clueArray;
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
  }
);

Router.delete("/delete/:id", superAdminVerify, async (req, res) => {
  try {
    const { id } = req.params;

    const mission = await Mission.findById(id);
    if (!mission) {
      return res.status(404).json({ message: "No such mission found" });
    }
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
