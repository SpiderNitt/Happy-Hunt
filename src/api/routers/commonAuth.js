const commonAuth = require("express").Router();
const { validationResult } = require("express-validator");
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
    const user = await User.findOne({ emailId, password, active: true });
    if (user === undefined || user === null)
      return res.status(400).json({ message: "User does not exist" });
    const token = createJWTtoken(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
module.exports = commonAuth;