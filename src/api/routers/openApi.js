const openApi = require("express").Router();
const schedule = require("node-schedule");
const Team = require("../../database/models/Team");
const Mission = require("../../database/models/Mission");
const User = require("../../database/models/User");
const Hint = require("../../database/models/Hint");
const { io } = require("../../helpers/timer");
const { superAdminVerify } = require("../../middlewares/role");

openApi.get("/scoreboard", async (req, res) => {
  try {
    const teamScore = await Team.find()
      .sort({ points: -1 })
      .populate("members", "name -_id")
      .select("teamName points -_id members");
    return res.status(200).json(teamScore);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Server Error, Try again later" });
  }
});
openApi.get("/mission/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mission = await Mission.findById(id);
    if (!mission) {
      return res.status(404).json({ message: "Mission not found" });
    }
    const hint = [];
    let i;
    for (i = 0; i < mission.Hints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const result = await Hint.findById(mission.Hints[i]);
      hint.push(result);
    }
    const result = { mission, hint };
    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ Message: "Server Error, Try again later" });
  }
});
openApi.get("/adminList", async (req, res) => {
  try {
    const adminList = await User.find({ Role: "Admin" });
    if (!adminList)
      return res.status(404).json({ message: "Admin list is empty" });
    return res.status(200).json(adminList);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
openApi.get("/start", superAdminVerify, async (req, res) => {
  io.emit("start");
  setTimeout(() => {
    io.emit("end");
    console.log("enddddddddddd");
  }, 10000);
  return res.status(200).json({ message: "scheduled" });
});

openApi.get("/notifications", async (req, res) => {
  try {
    if (
      req.jwt_payload.Role === "Admin" ||
      req.jwt_payload.Role === "SuperAdmin"
    ) {
      const AdminNotification = await User.find(
        { Role: "SuperAdmin" },
        {
          Notifications: 1,
        }
      );
      return res.status(200).json({ message: "success", AdminNotification });
    }

    const TeamsNotification = await Team.findById(req.jwt_payload.team, {
      Notifications: 1,
    });
    return res.status(200).json({ message: "success", TeamsNotification });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});

module.exports = openApi;
