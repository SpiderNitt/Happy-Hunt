const player = require("express").Router();
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const {
  playerRegisterValidator,
} = require("../../middlewares/expressValidator");
const User = require("../../database/models/User");
const { createJWTtoken } = require("../../middlewares/jwt");

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
      const info = await transporter.sendMail({
        from: `Happy Hunt <info@happyhunt.com>`,
        to: emailId,
        subject: "Happy hunt player account verification",
        html: `<a href='localhost:${process.env.APP_PORT}/auth/player/verify/${user._id}' >Click the above link to verify your account</a>`,
      });
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      return res.status(200).json({ message: "Verification email sent" });
    } catch (err) {
      console.log(err.message);
      return res.status(400).json({ message: "Verification email not sent" });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
player.get("/verify/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndUpdate(
      id,
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
    console.log(token);
    return res.status(200).json({ JWTtoken: token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
player.post("/login", async (req, res) => {
  try {
    const { userId, password } = req.body;
    const user = await User.findOne({ userId, password, status: true });
    if (user === undefined || user === null)
      return res.status(400).json({ message: "Invalid username or password" });
    const token = createJWTtoken(user);
    return res.status(200).json(token);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
module.exports = player;
