/* eslint-disable no-await-in-loop */
const multer = require("multer");
const player = require("express").Router();
const geolib = require("geolib");
const Mission = require("../../database/models/Mission");
const Activity = require("../../database/models/Activity");
const Team = require("../../database/models/Team");
const User = require("../../database/models/User");
const Hint = require("../../database/models/Hint");

player.post(
  "/submission",
  multer({ storage: multer.memoryStorage() }).single("answer"),
  async (req, res) => {
    try {
      const { team } = req.jwt_payload;
      const { mission } = req.body;
      if (!mission) return res.status(400).json({ message: "Fill all fields" });
      const submit = await Mission.findById(mission);
      const answerType = submit.answer_Type;
      const { Category, visibility, ServerEvaluation, maxPoints } = submit;
      if (answerType === undefined || answerType === null) {
        return res.status(404).json({ message: "Mission not found" });
      }
      let answer;
      try {
        switch (answerType) {
          case "Picture": {
            if (req.file === undefined || req.file == null)
              return res.status(400).json({ message: "No picture submission" });
            answer = req.file.buffer.toString("base64");
            break;
          }

          case "Text": {
            if (req.body.answer === undefined || req.body.answer == null)
              return res.status(400).json({ message: "No text submission" });
            answer = req.body.answer;
            break;
          }
          case "Video": {
            if (req.file === undefined || req.file == null)
              return res.status(400).json({ message: "No video submission" });
            answer = req.file.buffer.toString("base64");
            break;
          }
          case "Picture and Location": {
            if (req.file === undefined || req.file == null)
              return res.status(400).json({ message: "No picture submission" });
            const { Lat, Long } = submit.Location;
            const lat = Lat.toString();
            const lon = Long.toString();
            const { latSub, lonSub } = req.body;
            const distance = geolib.getDistance(
              { latitude: lat, longitude: lon },
              { latitude: latSub, longitude: lonSub }
            );
            console.log(distance);
            if (distance > 5000)
              return res
                .status(200)
                .json({ message: "You haven't reached the location" });
            answer = req.file.buffer.toString("base64");
            break;
          }
          default: {
            return res
              .status(500)
              .json({ message: "Database error,answerType improper" });
          }
        }
        let result;
        if (ServerEvaluation && answerType === "Text") {
          const originalAnswer = submit.answer;
          let rightAnswer = false;
          for (let i = 0; i < originalAnswer.length; i += 1) {
            if (originalAnswer[i] === answer) {
              rightAnswer = true;
            }
          }
          if (rightAnswer) {
            const { hintsTaken } = await Activity.findOne({
              mission,
              team,
              isSubmitted: false,
            });
            let { points } = await Team.findById(team);
            const marks = maxPoints - hintsTaken * 20;
            points += marks;
            const teamResult = await Team.updateOne({ _id: team }, { points });
            if (teamResult.nModified !== 1)
              return res
                .status(404)
                .json({ message: "Team score not updated" });
            result = await Activity.updateOne(
              { team, mission, isSubmitted: false },
              {
                Answer: answer,
                category: Category,
                status: "Accepted",
                ShouldBeShown: visibility,
                isSubmitted: true,
              }
            );
          } else {
            return res.status(200).json({ message: "Your answer is wrong" });
          }
        } else if (ServerEvaluation) {
          const { hintsTaken } = await Activity.findOne({
            mission,
            team,
            isSubmitted: false,
          });
          let { points } = await Team.findById(team);
          const marks = maxPoints - hintsTaken * 20;
          points += marks;
          const teamResult = await Team.updateOne({ _id: team }, { points });
          if (teamResult.nModified !== 1)
            return res.status(404).json({ message: "Team score not updated" });
          result = await Activity.updateOne(
            { team, mission, isSubmitted: false },
            {
              Answer: answer,
              category: Category,
              status: "Accepted",
              ShouldBeShown: visibility,
              isSubmitted: true,
            }
          );
        } else {
          result = await Activity.updateOne(
            { team, mission, isSubmitted: false },
            {
              Answer: answer,
              category: Category,
              status: "Pending",
              ShouldBeShown: visibility,
              isSubmitted: true,
            }
          );
        }
        if (result.nModified === 1) {
          return res.status(200).json({ message: "Successfully submitted" });
        }
        if (result.n === 1) {
          return res.status(204).json({ mission: "Activity unable to submit" });
        }
        return res.status(404).json({ message: "Activity not found" });
      } catch (error) {
        console.log(error);
        return res.status(416).json({ message: "Cannot submit answer" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error, Try again later" });
    }
  }
);
player.get("/profile", async (req, res) => {
  try {
    const user = await User.findById(req.jwt_payload.id);
    if (user === undefined || user === null) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
player.patch(
  "/update",
  multer({ storage: multer.memoryStorage() }).single("photo"),
  async (req, res) => {
    try {
      const { id } = req.jwt_payload;
      const update = {};
      const userDetails = await User.findById(id);
      if (!req.body.name && !req.body.gender && !req.file && !req.body.age) {
        return res.status(400).json({ message: "Fill all fields" });
      }
      update.age = req.body.age ? req.body.age : userDetails.age;
      update.gender = req.body.gender ? req.body.gender : userDetails.gender;
      update.name = req.body.name ? req.body.name : userDetails.name;
      try {
        update.photo = req.file
          ? req.file.buffer.toString("base64")
          : userDetails.photo;
      } catch (err) {
        console.log(err.message);
        return res.status(400).json({ message: "Image upload failed" });
      }
      const result = await User.updateOne({ _id: id }, update);
      if (result.nModified === 1) {
        return res.status(200).json({ message: "Successfully updated" });
      }
      if (result.n === 1) {
        return res.status(200).json({ mission: "Unable to update" });
      }
      return res.status(404).json({ message: "User not found" });
    } catch (error) {
      console.log(error.message);
      return res.status(416).json({ message: "Server error, try again later" });
    }
  }
);
player.get("/mission", async (req, res) => {
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
          isSubmitted: false,
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
player.get("/hint", async (req, res) => {
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
module.exports = player;
