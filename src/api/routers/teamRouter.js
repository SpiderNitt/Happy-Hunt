const team = require("express").Router();
const { uid } = require("uid");
const Team = require("../../database/models/Team");
const User = require("../../database/models/User");
const { jwtVerify } = require("../../middlewares/jwt");

team.post("/create", jwtVerify, async (req, res) => {
  try {
    const { teamName } = req.body;

    if (teamName == null) {
      return res.status(200).json({ Message: "Fill all the fields " });
    }

    const user = await User.findOne({ id: req.jwt_payload.id });
    let teamId = uid();
    while (await Team.exists({ teamId: teamId })) {
      teamId = uid();
    }

    const newTeam = new Team({
      teamId,
      teamName,
      members: [],
    });
    newTeam.members.push(user);
    newTeam.save();

    return res
      .status(200)
      .json({ Message: "Team created Successfully. Happy Hunting!!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Internal Server Error, Try again later!!" });
  }
  return 0;
});

team.create("/join", async (req, res) => {
  try {
    const { teamId } = req.body;
    if (teamId == null) {
      return res.status(200).json({ Message: "Fill all the fields " });
    }

    const user = await User.findOne({ id: req.jwt_payload.id });
    const existingTeam = await Team.findOne({ teamId });
    existingTeam.members.push(user);

    return res
      .status(200)
      .json({ Message: "Team joined Successfully. Happy Hunting!!" });
  } catch (error) {
    res
      .status(500)
      .json({ Message: "Internal Server Error, Try again later!!" });
  }
  return 0;
});
