const team = require("express").Router();
const { uid } = require("uid");
const nodemailer = require("nodemailer");
const Team = require("../../database/models/Team");
const User = require("../../database/models/User");
const { jwtVerify } = require("../../middlewares/jwt");

team.post("/create", jwtVerify, async (req, res) => {
  try {
    const { teamName, emails } = req.body;
    if (teamName == null) {
      return res.status(200).json({ Message: "Fill all the fields " });
    }
    const testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    const user = await User.findOne({ Id: req.jwt_payload.id });
    console.log(user);
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

    const info = await transporter.sendMail({
      from: `"${user.name}" <info@happyhunt.com>`,
      to: emails.join(", "),
      subject: "Invite to the greatest hunt ever",
      html: `<a href='localhost:8000/auth/team/join?teamid=${newTeam.teamId}' >click the link to join my team</a>`,
    });
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    return res.status(200).json({
      Message: "Team created Successfully. Happy Hunting!!",
      Team: newTeam,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Internal Server Error, Try again later!!" });
  }
  return 0;
});

team.get("/join", jwtVerify, async (req, res) => {
  try {
    const { teamid } = req.query;
    if (teamid == null) {
      return res.status(200).json({ Message: "Fill all the fields " });
    }

    const user = await User.findOne({ Id: req.jwt_payload.id });
    const existingTeam = await Team.findOne({ teamId: teamid });
    existingTeam.members.push(user);

    return res
      .status(200)
      .json({ Message: "joined to the Team Successfully. Happy Hunting!!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Internal Server Error, Try again later!!" });
  }
  return 0;
});

module.exports = team;
