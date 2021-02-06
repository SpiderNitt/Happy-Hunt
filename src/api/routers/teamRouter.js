const team = require("express").Router();
const { uid } = require("uid");
const Team = require("../../database/models/Team");
const User = require("../../database/models/User");
const { createJWTtoken } = require("../../middlewares/jwt");
const { playerVerify, leaderVerify } = require("../../middlewares/role");
const { io } = require("../../helpers/timer");
const { sendEmail } = require("../../helpers/EMAIL/SGemail");

team.post("/create", playerVerify, async (req, res) => {
  try {
    const { teamName } = req.body;
    if (teamName == null || teamName === "") {
      return res.status(200).json({ Message: "Fill all the fields " });
    }
    const name = await Team.findOne({ teamName });

    if (name) {
      return res
        .status(401)
        .json({ message: "team of this name already exists" });
    }
    if (
      req.jwt_payload.Role === "TeamLeader" ||
      req.jwt_payload.Role === "TeamMember"
    ) {
      return res
        .status(402)
        .json({ message: "you already joined or created a team" });
    }

    const user = await User.findById(req.jwt_payload.id).lean();
    if (user.Paid === 0) {
      if (user.paymentAuthorize === 0) {
        return res.status(401).json({
          message:
            "Your payment is authorized but not transferred, Pleast try after your amount is transferred",
        });
      }
      if (user.paymentAuthorize === -1) {
        return res.status(401).json({
          message: "make a payment to create a team",
        });
      }
      return res
        .status(401)
        .json({ message: "make a payment to create a team" });
    }
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
    const filter = [
      "password",
      "otpId",
      "VerificationToken",
      "isEmailVerified",
      "paymentAuthorize",
      "Paid",
    ];
    const response = Object.keys(user).reduce((object, key) => {
      if (!filter.includes(key)) {
        object[key] = user[key];
      }
      return object;
    }, {});
    return res.status(200).json({
      Message: "Team created Successfully. Happy Hunting!!",
      userInfo: response,
      JWTtoken: token,
      expiration: req.jwt_payload.exp,
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
    const user = await User.findById(req.jwt_payload.id);
    if (user.Role === "TeamLeader" || user.Role === "TeamMember") {
      return res
        .status(402)
        .json({ message: "you are already part of a team" });
    }

    const existingTeam = await Team.findOne({ teamId })
      .populate("members")
      .exec();
    if (teamId === undefined || teamId === null || existingTeam === null) {
      return res.status(400).json({ message: "Invalid teamId" });
    }
    if (existingTeam.requests.includes(user._id)) {
      return res.status(400).json({ message: "Request already sent" });
    }
    let CaptainID;
    for (let i = 0; i < existingTeam.members.length; i += 1) {
      const member = existingTeam.members[i];
      if (member.Role === "TeamLeader") {
        CaptainID = member._id;
      }
    }
    io.emit(`Request ${CaptainID}`);
    if (existingTeam.Paid < 1) {
      return res.status(200).json({ message: "Oops! Team is already full" });
    }
    // existingTeam.requests.push(req.jwt_payload.id);
    await Team.updateOne(
      { teamId },
      {
        $push: { requests: req.jwt_payload.id },
      }
    );
    // await existingTeam.save();
    const captain = await User.findById(CaptainID);
    await sendEmail(
      captain.emailId,
      "User Requested to join ur team",
      "Request to join ur team",
      `<body style="font-family: tahoma"><h2>Greetings from Happy Hunt!</h2><h4>User request</h4><p>Congratualtions! ${user.name} has requested to join your team.</p><p> You can accept or reject the request.</p><button href="www.hhc.eventspeciale.com/user/team/request?userId=${req.jwt_payload.id}&name=${user.name}" style="background-color: green; color: white; padding:5px ; border-radius: 3px">Accept</button> <button href="www.hhc.eventspeciale.com/api/team/accept?userId=${req.jwt_payload.id}" style="background-color: red; color: white; padding:5px ; border-radius: 3px">Reject</button><p style="color:navy">Happy hunting!</p></body>`
    );
    return res.status(200).json({ message: "Join request sent!" });
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
    const user = await User.findById(userId);
    if (userId === undefined || userId === null || user === null) {
      return res
        .status(400)
        .json({ message: "Invalid userId or Provide userId" });
    }
    const existingTeam = await Team.findById(req.jwt_payload.team);
    io.emit(`Request ${userId}`, "Reject");
    existingTeam.requests.splice(existingTeam.requests.indexOf(userId), 1);
    // await existingTeam.save();
    await Team.updateOne(
      { _id: req.jwt_payload.team },
      {
        $pull: { requests: userId },
      }
    );
    io.emit(`Request ${userId}`, "Reject");
    await sendEmail(
      user.emailId,
      "leader rejected your request",
      "your request to join the team was rejected",
      `<body style="font-family: tahoma"><h2>Greetings from Happy Hunt!</h2><h4>Request rejected</h4><p>Oops! Your request to join the team ${existingTeam.teamName} has been rejected.</p><p style="color:navy">Happy hunting!</p></body>`
    );
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
    const user = await User.findById(userId);
    if (userId == null || userId === "" || user === null) {
      return res.status(200).json({ Message: "Fill all the fields " });
    }
    user.Role = "TeamMember";
    const existingTeam = await Team.findById(req.jwt_payload.team);
    if (existingTeam.Paid < 1) {
      return res.status(200).json({ message: "Team is full" });
    }

    user.team = existingTeam._id;
    existingTeam.members.push(userId);
    existingTeam.Paid -= 1;
    existingTeam.requests.splice(existingTeam.requests.indexOf(userId), 1);
    // await existingTeam.save();
    await Team.updateOne(
      { _id: req.jwt_payload.team },
      {
        $pull: { requests: userId },
        $push: { members: userId },
        Paid: existingTeam.Paid,
      }
    );
    await user.save();
    const token = createJWTtoken(user);
    io.emit(`Request ${userId}`, "Accept");
    await sendEmail(
      user.emailId,
      "leader accepted your request",
      "your request to join the team was accepted",
      `<body style="font-family: tahoma">

      <h2>Greetings from Happy Hunt!</h2>
       <h4>Request Accepted</h4>
      <p>Congratulations! Your request to join the team ${existingTeam.teamName} has been acepted.</p>
      <p style="color:navy">Happy hunting!</p>
        
      </body>`
    );
    const date = new Date();
    date.setTime(date.getTime() + 86400000);
    return res.status(200).json({
      Message: "Request Accepted",
      jwttoken: token,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ Message: "Internal Server Error, Try again later!!" });
  }
  return 0;
});

team.post("/location", leaderVerify, async (req, res) => {
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
      if (
        Location.coords.latitude === undefined ||
        Location.coords.longitude === undefined
      ) {
        return res.status(400).json({ message: "Invalid Location" });
      }
      theTeam.avgLocation.Lat = Location.coords.latitude;
      theTeam.avgLocation.Long = Location.coords.longitude;
      await theTeam.save();
      return res.status(200).json({ message: "success" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

team.get("/requests", async (req, res) => {
  try {
    const TeamsRequest = await Team.findById(req.jwt_payload.team, {
      Request: 1,
    });
    return res.status(200).json({ message: "success", TeamsRequest });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: e.message });
  }
});
team.get("/score", async (req, res) => {
  try {
    const score = await Team.findById(req.jwt_payload.team, { points: 1 });
    return res.status(200).json({ score });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: "Server Error" });
  }
});
module.exports = team;
