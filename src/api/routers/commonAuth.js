const commonAuth = require("express").Router();
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../../database/models/User");
const { createJWTtoken } = require("../../middlewares/jwt");
const { loginValidator } = require("../../middlewares/expressValidator");

commonAuth.post("/login", loginValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { emailId, password } = req.body;
    if (!emailId || !password)
      return res.status(400).json({ message: "Enter all fields" });
    const user = await User.findOne({
      emailId,
      /* active: true */ isEmailVerified: true,
    }).lean();
    if (user === undefined || user === null)
      return res
        .status(400)
        .json({ message: "User does not exist or emailID not verified" });
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Incorrect password" });
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
    const date = new Date();
    date.setTime(date.getTime() + 86400000);
    return res.status(200).json({ user: response, token, expiration: date });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
module.exports = commonAuth;
