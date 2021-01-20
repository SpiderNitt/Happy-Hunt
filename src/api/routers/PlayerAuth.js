const player = require("express").Router();
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const {
  playerRegisterValidator,
} = require("../../middlewares/expressValidator");
const User = require("../../database/models/User");
const { createJWTtoken } = require("../../middlewares/jwt");
const { send, verify } = require("../../helpers/SMS/index");

player.post("/register", playerRegisterValidator, async (req, res) => {
  try {
    const { name, emailId, phoneNo, password } = req.body;

    const pwd = await bcrypt.hash(
      password,
      parseInt(10, process.env.TOKEN_SECRET)
    );
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
      emailId,
      phoneNo,
      name,
      password: pwd,
      active: false,
      Role: "Player",
    });

    try {
      if (send(phoneNo)) return res.status(200).json({ message: "OTP sent" });
      return res.status(400).json({ message: "OTP not sent" });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ message: "OTP not sent" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
player.post("/resendOtp", async (req, res) => {
  try {
    const { mobileNo } = req.body;
    if (!mobileNo) return res.status(400).json({ message: "Fill all fields" });
    const user = await User.findOne({ phoneNo: mobileNo, active: false });
    if (!user) return res.status(400).json({ message: "User not registered" });
    if (send(mobileNo)) return res.status(200).json({ message: "OTP sent" });
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
    const user = await User.findOne({ phoneNo: mobileNo });
    if (!user) return res.status(400).json({ message: "User not registered" });
    // console.log(await verifySMS(user.otpId, otp));
    if (!(await verify(otp, user.otpId))) {
      await User.findOneAndRemove({ phoneNo: mobileNo });
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
    const date = new Date();
    date.setTime(date.getTime() + 86400000);
    return res.status(200).json({ result, token, expiration: date });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});

module.exports = player;
