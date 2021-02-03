const player = require("express").Router();
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const cryptoRandomString = require("crypto-random-string");
const {
  playerRegisterValidator,
  resetValidator,
} = require("../../middlewares/expressValidator");
const User = require("../../database/models/User");
const { createJWTtoken } = require("../../middlewares/jwt");
const { send, verify } = require("../../helpers/SMS/index");
const { sendEmail } = require("../../helpers/EMAIL/SGemail");

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
    const hash = cryptoRandomString({ length: 128, type: "alphanumeric" });
    console.log(hash);
    const user = await User.create({
      emailId,
      phoneNo,
      name,
      password: pwd,
      /* active: false, */
      isEmailVerified: false,
      VerificationToken: hash,
      Role: "Player",
    });
    // verification email
    try {
      await sendEmail(
        emailId,
        "Verification email",
        `welcome ,click on the link to verify your email`,

        `<body style="font-family: tahoma">

      <h2>Greetings from Happy Hunt!</h2>
       <h4>Verify your Email</h4>
      <p> <otp> is your one time password.
        </br/> Please use this to verify your Email.</p>
        <button href="www.hhc.eventspeciale.com/auth/player/email?verificationId=${hash}" style="background-color: green; color: white; border-radius: 3px; padding:5px">Verify</button>
      <p style="color:navy">Happy hunting!</p>
        
      </body>`
      );
      return res
        .status(200)
        .json({ message: "User created successfully , verify ur emailID" });
    } catch (e) {
      return res
        .status(403)
        .json({ message: "user created but email not send " });
    }

    /* const timeR = Date.now();
    await sendEmail(
      user.emailId,
      "welcome to Happy-Hunt",
      `welcome ,${timeR} `,
      "<h1>hello</h1>"
    ); */

    /* try {
      if (await send(phoneNo))
        return res.status(200).json({ message: "OTP sent" });
      return res.status(400).json({ message: "OTP not sent" });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ message: "OTP not sent" });
    } */
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

    if (await send(mobileNo))
      return res.status(200).json({ message: "OTP sent" });
    return res.status(404).json({ message: "token not provided" });
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
player.get("/email", async (req, res) => {
  try {
    const { verificationId } = req.query;

    if (verificationId === null) {
      return res.status(401).json({
        message: "Verification token wasn't provided to verify account",
      });
    }
    const user = await User.findOne({ VerificationToken: verificationId });
    if (user === null) {
      return res.status(404).json({
        message: "No such user found for particular verificationToken",
      });
    }
    if (user.isEmailVerified) {
      return res.status(402).json({ message: "user already verified" });
    }

    user.isEmailVerified = true;
    await user.save();
    return res.redirect("www.hhc.eventspeciale.com/auth/login");
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
player.get("/resendEmail", async (req, res) => {
  try {
    const { emailId } = req.query;
    const user = await User.findOne({ emailId });
    if (user === null) {
      return res.status(402).json({ message: "No such user found" });
    }
    if (user.isEmailVerified) {
      return res.status(401).json({ message: "user is already verified" });
    }

    const hash = cryptoRandomString({ length: 128, type: "alphanumeric" });
    console.log(hash);
    user.VerificationToken = hash;
    await user.save();

    try {
      await sendEmail(
        emailId,
        "Verification email",
        `welcome ,click on the link to verify your email`,

        `<body style="font-family: tahoma">

      <h2>Greetings from Happy Hunt!</h2>
       <h4>Verify your Email</h4>
      <p> <otp> is your one time password.
        </br/> Please use this to verify your Email.</p>
        <button href="www.hhc.eventspeciale.com/auth/player/email?verificationId=${hash}" style="background-color: green; color: white; border-radius: 3px; padding:5px">Verify</button>
      <p style="color:navy">Happy hunting!</p>
        
      </body>`
      );
      return res.status(200).json({ message: "Email sent" });
    } catch (e) {
      return res.status(403).json({ message: " email not send " });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
player.post("/forgotPassword", async (req, res) => {
  try {
    const { emailId } = req.body;
    const hash = cryptoRandomString({ length: 5, type: "alphanumeric" });
    const result = await User.updateOne(
      { emailId },
      { VerificationToken: hash }
    );
    if (result.nModified !== 1)
      return res.status(400).json({ message: "Unable to reset password" });
    await sendEmail(
      emailId,
      "Reset Password",
      `welcome ,click on the link to reset your password`,

      `<body style="font-family: tahoma">

    <h2>Greetings from Happy Hunt!</h2>
     <h4>Reset your password</h4>
      </br/> Please use this to reset your password.</p>
      <b>VERIFICATION ID: ${hash}</b>
    <p style="color:navy">Happy hunting!</p>
      
    </body>`
    );

    return res
      .status(200)
      .json({ message: "Reset password email sent successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
player.post("/reset", resetValidator, async (req, res) => {
  try {
    const { verificationId, emailId, password } = req.body;
    const user = await User.findOne({
      VerificationToken: verificationId,
      emailId,
    });
    if (user === null) {
      return res.status(404).json({
        message: "Incorrect verification Token",
      });
    }
    const pwd = await bcrypt.hash(
      password,
      parseInt(10, process.env.TOKEN_SECRET)
    );
    user.password = pwd;
    await user.save();
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
module.exports = player;
