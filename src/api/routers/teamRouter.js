const team = require("express").Router();
const { uid } = require("uid");
const Team = require("../../database/models/Team");
const User = require("../../database/models/User");
const { jwtVerify, createJWTtoken } = require("../../middlewares/jwt");

team.post("/create", async (req, res) => {
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
    await newTeam.save();
    user.team = newTeam._id;
    await user.save();
    const token = createJWTtoken(user);
    return res.status(200).json({
      Message: "Team created Successfully. Happy Hunting!!",
      TeamId: newTeam.teamId,
      JWTtoken: token,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ Message: "Internal Server Error, Try again later!!" });
  }
  // return 0;
});

team.get("/join", async (req, res) => {
  try {
    const { teamid } = req.query;
    if (teamid == null || teamid === "") {
      return res.status(200).json({ Message: "Fill all the fields " });
    }

    const user = await User.findById(req.jwt_payload.id);
    user.Role = "TeamMember";
    const existingTeam = await Team.findOne({ teamId: teamid });

    user.team = existingTeam._id;
    existingTeam.members.push(user);
    existingTeam.save();
    user.save();
    const token = createJWTtoken(user);

    return res.status(200).json({
      Message: "joined to the Team Successfully. Happy Hunting!!",
      JWTtoken: token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Internal Server Error, Try again later!!" });
  }
  return 0;
});

team.post("/location", async (req, res) => {
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
