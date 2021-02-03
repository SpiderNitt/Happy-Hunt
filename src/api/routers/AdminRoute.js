const Router = require("express").Router();
const cryptoRandomString = require("crypto-random-string");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const User = require("../../database/models/User");
const {
  AdminCreateValidator,
  AcceptValidator,
} = require("../../middlewares/expressValidator");
const Team = require("../../database/models/Team");
const Activity = require("../../database/models/Activity");
const Mission = require("../../database/models/Mission");
const { adminVerify, superAdminVerify } = require("../../middlewares/role");
const { io } = require("../../helpers/timer");
const { sendEmail } = require("../../helpers/EMAIL/SGemail");
const algo = require("../../helpers/algo");

Router.post(
  "/createAdmin",
  AdminCreateValidator,
  superAdminVerify,
  async (req, res) => {
    try {
      const { emailId } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      if (emailId !== undefined) {
        // creating random password
        const user = await User.findOne({ emailId });
        if (user) {
          return res.status(403).json({ message: "user already exists" });
        }
        const adminpassword = cryptoRandomString({
          length: 10,
          type: "alphanumeric",
        });

        const password = await bcrypt.hash(
          adminpassword,
          parseInt(10, process.env.TOKEN_SECRET)
        );

        await User.create({
          emailId,
          Role: "Admin",
          password,
          /* active: true, */
          isEmailVerified: true,
        });
        await sendEmail(
          emailId,
          "ADMIN created",
          `Hii ur invited to happy hunt as admin.`,
          `<body style="font-family: tahoma"><h2>Greetings from Happy Hunt!</h2><h4>Admin added.</h4><p>Congratualtions! You have been successfully added to Happy Hunt as an admin.</p><p> This is your password: ${password} < We request you to keep it confidential. </p><p style="color:navy">Happy hunting!</p></body>`
        );
        return res
          .status(200)
          .json({ AdminEmailId: emailId, password: adminpassword });
      }
      return res
        .status(401)
        .json({ message: "emailId provided was undefined" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        message: "Server Error ",
      });
    }
  }
);
Router.delete("/deleteAdmin", superAdminVerify, async (req, res) => {
  try {
    const { emailId } = req.query;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (emailId !== undefined) {
      if (!(await User.findOne({ emailId }))) {
        return res.status(404).json({ message: "no such user found" });
      }

      await User.deleteOne({ emailId });
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
Router.get("/start", adminVerify, async (req, res) => {
  try {
    algo();
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server error" });
  }
});
Router.get("/submissions", adminVerify, async (req, res) => {
  try {
    const activityFeeds = await Activity.find({
      isSubmitted: true,
      status: false,
    });

    return res.status(200).json({ submissions: activityFeeds });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});
Router.post("/accept", AcceptValidator, adminVerify, async (req, res) => {
  try {
    const { isAccepted, activityfeedId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const activity = await Activity.findById(activityfeedId)
      .populate("team")
      .exec();
    if (!activity) {
      return res.status(404).json({ message: "no such activity found" });
    }
    const mission = await Mission.findById(activity.mission);
    const team = await Team.findById(activity.team._id);
    let notification;
    if (isAccepted) {
      if (activity.isSubmitted && !activity.status) {
        team.points += mission.maxPoints / 2 - activity.hintsTaken * 20;
        activity.status = true;
        activity.Date = Date.now();
        await team.save();
        await activity.save();
        notification = `your submission for ${mission.MissionName} is accepted`;
      } else {
        return res.status(403).json({
          message:
            "answer is already accepted or team didn't made new submission",
        });
      }
    } else {
      activity.isSubmitted = false;
      activity.Date = Date.now();
      await activity.save();
      notification = `your submission for ${mission.MissionName} is rejected`;
    }
    team.Notifications.push(notification);
    await team.save();
    io.emit(`Notifications ${activity.team._id}`, notification);

    return res
      .status(200)
      .json({ message: "Answered successfully accepted or rejected" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});
Router.get("/paymentPending", adminVerify, async (req, res) => {
  try {
    const result = await User.find({ paymentAuthorize: 0 });
    const details = {
      name: result.name,
      emailId: result.emailId,
      paymentDetails: result.paymentDetails,
    };
    return res.status(200).json(details);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, try again later " });
  }
});
module.exports = Router;
