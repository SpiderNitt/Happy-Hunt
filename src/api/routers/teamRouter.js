const team = require("express").Router();
const { uid } = require("uid");
const Team = require("../../database/models/Team");
const User = require("../../database/models/User");
const { jwtVerify, createJWTtoken } = require("../../middlewares/jwt");
const { playerVerify, leaderVerify } = require("../../middlewares/role");
const { io } = require("../../helpers/timer");

team.post("/create", playerVerify, async (req, res) => {
  try {
    const { teamName } = req.body;
    if (teamName == null || teamName === "") {
      return res.status(200).json({ Message: "Fill all the fields " });
    }

    const user = await User.findById(req.jwt_payload.id);
    console.log(user);
    user.Role = "TeamLeader";
    let teamId = uid();
    while (await Team.exists({ teamId })) {
      teamId = uid();
    }

    const newTeam = new Team({
      teamId,
      teamName,
      members: [],
    });
    newTeam.members.push(user);
    if (user.Paid) newTeam.Paid = user.Paid;
    await newTeam.save();
    user.team = newTeam._id;
    await user.save();
    const token = createJWTtoken(user);
    const date = new Date();
    date.setTime(date.getTime() + 86400000);
    return res.status(200).json({
      Message: "Team created Successfully. Happy Hunting!!",
      TeamId: newTeam.teamId,
      JWTtoken: token,
      expiration: date,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ Message: "Internal Server Error, Try again later!!" });
  }
  // return 0;
});

team.get("/request/:teamId", playerVerify, async (req, res) => {
  try {
    const { teamId } = req.params;
    if (teamId === undefined || teamId === null) {
      return res
        .status(400)
        .json({ message: "Invalid teamId or Provide teamId" });
    }
    const existingTeam = await Team.findOne({ teamId });
    if (existingTeam.Paid < 1) {
      return res.status(200).json({ message: "Team is full" });
    }
    existingTeam.requests.push(req.jwt_payload.id);
    existingTeam.save();
    io.emit(`Requests ${teamId}`, 1);
    return res.status(200).json({ message: "Request sent" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Internal Server Error, Try again later!!" });
  }
});

team.get("/reject", leaderVerify, async (req, res) => {
  try {
    const { userId } = req.query;
    if (userId === undefined || userId === null) {
      return res
        .status(400)
        .json({ message: "Invalid userId or Provide userId" });
    }
    const existingTeam = await Team.findById(req.jwt_payload.team);
    existingTeam.requests.splice(existingTeam.requests.indexOf(userId), 1);
    existingTeam.save();
    return res.status(200).json({ message: "Request Rejected" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Internal Server Error, Try again later!!" });
  }
});

team.get("/accept", leaderVerify, async (req, res) => {
  try {
    const { userId } = req.query;
    if (userId == null || userId === "") {
      return res.status(200).json({ Message: "Fill all the fields " });
    }
    const user = await User.findById(userId);
    user.Role = "TeamMember";
    const existingTeam = await Team.findById(req.jwt_payload.team);
    if (existingTeam.Paid < 1) {
      return res.status(200).json({ message: "Team is full" });
    }
    user.team = existingTeam._id;
    existingTeam.members.push(user);
    existingTeam.Paid -= 1;
    existingTeam.requests.splice(existingTeam.requests.indexOf(userId), 1);
    existingTeam.save();
    user.save();
    const token = createJWTtoken(user);
    const date = new Date();
    date.setTime(date.getTime() + 86400000);
    return res.status(200).json({
      Message: "Request Accepted",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Internal Server Error, Try again later!!" });
  }
  return 0;
});

team.post("/location", playerVerify, async (req, res) => {
  try {
    const user = await User.findById(req.jwt_payload.id);
    if (user.Role === "TeamLeader") {
      const theTeam = await Team.findById(req.jwt_payload.team);
      //       GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1610034540979}
      // coords: GeolocationCoordinates
      // accuracy: 215723
      // altitude: null
      // altitudeAccuracy: null
      // heading: null
      // latitude: 11.127122499999999
      // longitude: 78.6568942
      // speed: null
      // __proto__: GeolocationCoordinates
      // timestamp: 1610034540979
      // __proto__: GeolocationPosition;
      const { Location } = req.body;
      theTeam.avgLocation.Lat = Location.coords.latitude;
      theTeam.avgLocation.Long = Location.coords.longitude;
      await team.save();
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = team;
