const Router = require("express").Router();
const cryptoRandomString = require("crypto-random-string");
const { validationResult } = require("express-validator");
const User = require("../../database/models/User");
const { AdminCreateValidator } = require("../../middlewares/expressValidator");
const Team = require("../../database/models/Team");
const Activity = require("../../database/models/Activity");
const Mission = require("../../database/models/Mission");

Router.post("/create_admin", AdminCreateValidator, async (req, res) => {
  try {
    const issuperadmin = await User.findById(req.jwt_payload.id);
    if (issuperadmin.Role !== "SuperAdmin") {
      return res.status(402).json({
        message: "You don't have permission to perform the operation",
      });
    }
    const { emailId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (emailId !== undefined) {
      // creating random password
      const user = await User.findOne({ Id: emailId });
      if (user) {
        return res.status(403).json({ message: "user already exists" });
      }
      const adminpassword = cryptoRandomString({
        length: 10,
        type: "alphanumeric",
      });
      console.log("password", adminpassword);

      await User.create({
        Id: emailId,
        Role: "admin",
        password: adminpassword,
      });
      return res
        .status(200)
        .json({ AdminEmailId: emailId, password: adminpassword });
    }
    return res.status(401).json({ message: "emailId provided was undefined" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
Router.delete("/delete_admin", AdminCreateValidator, async (req, res) => {
  try {
    const issuperadmin = await User.findById(req.jwt_payload.id);
    if (issuperadmin.Role !== "SuperAdmin") {
      return res.status(402).json({
        message: "You don't have permission to perform the operation",
      });
    }
    const { emailId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (emailId !== undefined) {
      if (!(await User.findOne({ Id: emailId }))) {
        return res.status(404).json({ message: "no such user found" });
      }

      await User.deleteOne({ Id: emailId });
      return res.status(200).json({ message: "user deleted sucessfully" });
    }
    return res.status(401).json({ message: "emailId provided was undefined" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
Router.post("/accept", async (req, res) => {
  try {
    const { isAccepted, activityfeedId } = req.body;
    const activity = await Activity.findById(activityfeedId)
      .populate("team")
      .exec();
    const mission = await Mission.findById(activity.mission);
    const team = await Team.findById(activity.team._id);
    console.log();

    if (isAccepted) {
      console.log(mission.maxPoints, " - ", activity.hintsTaken);
      team.points += mission.maxPoints - activity.hintsTaken * 20;
      activity.status = true;
      await team.save();
      await activity.save();
    } else {
      await activity.deleteOne({ id: activityfeedId });
    }
    res.status(200).json({ message: "Answered successfully accepted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
});

module.exports = Router;
