/* eslint-disable no-await-in-loop */
const multer = require("multer");
const player = require("express").Router();
const geolib = require("geolib");
const { getDistance } = require("geolib");
const Mission = require("../../database/models/Mission");
const Activity = require("../../database/models/Activity");
const Team = require("../../database/models/Team");
const User = require("../../database/models/User");
const Hint = require("../../database/models/Hint");
const { playerVerify } = require("../../middlewares/role");
const { io } = require("../../helpers/timer");
const { TeamenRollVerify } = require("../../middlewares/team");

player.post(
  "/submission",
  multer({ storage: multer.memoryStorage() }).single("answer"),
  playerVerify,
  TeamenRollVerify,
  async (req, res) => {
    try {
      const { team } = req.jwt_payload;
      const user = Team.findById(team);
      const { mission } = req.body;
      if (!mission) return res.status(400).json({ message: "Fill all fields" });
      const submit = await Mission.findById(mission);
      const answerType = submit.answer_Type;
      const { Category, visibility, ServerEvaluation, maxPoints } = submit;
      if (answerType === undefined || answerType === null) {
        return res.status(404).json({ message: "Mission not found" });
      }
      let answer;
      let notification;
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
            const marks = maxPoints / 2 - hintsTaken * 20;
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
                status: true,
                ShouldBeShown: visibility,
                isSubmitted: true,
              }
            );
            // team
            notification = `You got right answer for ${submit.MissionName}`;
          } else {
            notification = `You got wrong answer for ${submit.MissionName}`;
            return res.status(200).json({ message: "Your answer is wrong" });
          }
          team.Notifications.push(notification);
          await user.save();
          io.emit(`Notifications ${team}`, notification);
        } else if (ServerEvaluation) {
          const { hintsTaken } = await Activity.findOne({
            mission,
            team,
            isSubmitted: false,
          });
          let { points } = await Team.findById(team);
          const marks = maxPoints / 2 - hintsTaken * 20;
          points += marks;
          const teamResult = await Team.updateOne({ _id: team }, { points });
          if (teamResult.nModified !== 1)
            return res.status(404).json({ message: "Team score not updated" });
          result = await Activity.updateOne(
            { team, mission, isSubmitted: false },
            {
              Answer: answer,
              category: Category,
              status: true,
              ShouldBeShown: visibility,
              isSubmitted: true,
            }
          );
          // team
          notification = `You got right answer for ${submit.MissionName}`;
          team.Notifications.push(notification);
          await user.save();
          io.emit(`Notifications ${team}`, notification);
        } else {
          result = await Activity.updateOne(
            { team, mission, isSubmitted: false },
            {
              Answer: answer,
              category: Category,
              status: false,
              ShouldBeShown: visibility,
              isSubmitted: true,
            }
          );
          // admin
          const head = await User.findOne({ Role: "SuperAdmin" });
          notification = `New submission for ${submit.MissionName} by team ${user.teamName}`;
          head.Notifications.push(notification);
          await head.save();
          io.emit(`Notifications`, notification);
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
player.post(
  "/locationSubmission",
  playerVerify,
  TeamenRollVerify,
  async (req, res) => {
    try {
      const team = await Team.findById(req.jwt_payload.team);

      const { Location, MissionId } = req.body;
      const mission = await Mission.findById(MissionId);
      const teamActivity = await Activity.findOne({
        team: req.jwt_payload.team,
        mission: MissionId,
      });
      const distance = getDistance(
        {
          latitude: mission.Location.Lat,
          longitude: mission.Location.Long,
        },
        {
          latitude: Location.coords.latitude,
          longitude: Location.coords.longitude,
        }
      );
      if (!teamActivity.ispart) {
        if (distance < 1000) {
          team.points += mission.maxPoints / 2;
          teamActivity.ispart = true;
          await teamActivity.save();
          await team.save();
          return res.status(200).json({
            message: "answer succesfully submitted and points awarded",
          });
        }
        return res
          .status(401)
          .json({ message: "you haven't reached close to the location yet" });
      }
      return res
        .status(403)
        .json({ message: "You have already submited the mission" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error, Try again later" });
    }
  }
);
player.get("/profile", playerVerify, async (req, res) => {
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
  playerVerify,
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
player.get("/mission", playerVerify, TeamenRollVerify, async (req, res) => {
  try {
    const teamId = req.jwt_payload.team;

    const team = await Team.findById(teamId);

    const arr = [];
    const arr2 = [];
    const allMissions = team.assignedMissions;
    const allBonus = team.assignedBonus;
    for (let index = 0; index < allBonus.length; index += 1) {
      const activity = await Activity.findOne({
        team: req.jwt_payload.team,
        mission: allMissions[index],
      });

      const bonus = await Mission.findById(allMissions[index]).select({
        clue: 1,
        Category: 1,
        maxPoints: 1,
        answer_Type: 1,
      });
      arr2.push(bonus);

      if (!activity) {
        await Activity.create({
          team: req.jwt_payload.team,
          isSubmitted: false,
          likes: 0,
          mission: allMissions[index],
          hintsTaken: 0,
        });
      }
    }
    for (let i = 0; i < allMissions.length; i += 1) {
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

    return res.status(200).json({ missions: arr, bonus: arr2 });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
player.get("/hint", playerVerify, TeamenRollVerify, async (req, res) => {
  try {
    const { MissionId } = req.body;
    const mission = await Mission.findById(MissionId);
    const hint = mission.Hints;
    const activity = await Activity.findOne({
      team: req.jwt_payload.team,
      mission: MissionId,
    });
    if (!activity) {
      return res
        .status(404)
        .json({ message: "you team is not  assigned to the mission" });
    }
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
