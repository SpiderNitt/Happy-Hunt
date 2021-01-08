const player = require("express").Router();
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const {
  playerRegisterValidator,
} = require("../../middlewares/expressValidator");
const User = require("../../database/models/User");
const { createJWTtoken } = require("../../middlewares/jwt");
const { async } = require("crypto-random-string");

player.post("/register", playerRegisterValidator, async (req, res) => {
  try {
    const { name, emailId, phoneNo, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const uniquePhone = await User.findOne({ phoneNo });
    const uniqueEmail = await User.findOne({ emailId });
    if (uniquePhone !== null || uniqueEmail !== null) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      Id: emailId,
      phoneNo,
      name,
      password,
      active: false,
      Role: "Player",
    });
    try {
      // create reusable transporter object using the default SMTP transport
      return res.status(200).json({ message: "OTP sent" });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ message: "OTP not sent" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
player.post("/verify", async (req, res) => {
  try {
    const { otp, mobileNo } = req.body;
    if (!otp || !mobileNo)
      return res.status(400).json({ message: "Enter all fields" });
    if (otp !== "99999") {
      return res.status(400).json({ message: "OTP incorrect" });
    }
    const result = await User.findOneAndUpdate(
      { phoneNo: mobileNo },
      { active: true },
      { new: true }
    );
    if (result === null) {
      return res.status(400).json({ message: "User not found" });
    }
    if (result.active === false) {
      return res.status(400).json({ message: "User unable to verify" });
    }
    const token = createJWTtoken(result);
    req.session.token = token;
    return res.status(200).json({ JWTtoken: token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
player.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;
    if (!userId || !password)
      return res.status(400).json({ message: "Enter all fields" });
    const user = await User.findOne({ Id: userId, password, active: true });
    if (user === undefined || user === null)
      return res.status(400).json({ message: "User does not exist" });
    const token = createJWTtoken(user);
    req.session.token = token;
    return res.status(200).json({ JWTtoken: token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
module.exports = player;
