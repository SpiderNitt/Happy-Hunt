const Router = require("express").Router();
const cryptoRandomString = require("crypto-random-string");
const { validationResult } = require("express-validator");
const User = require("../../database/models/User");
const { InputValidator2 } = require("../../middlewares/adminAuthValidator");

Router.post("/", InputValidator2, async (req, res) => {
  try {
    const { emailId } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (emailId !== undefined) {
      // creating random password
      const user = await User.findOne({ Id: emailId });
      if (user) {
        return res.status(403).json({ message: "user already exists" });
      }
      const adminpassword = cryptoRandomString({
        length: 10,
        type: "alphanumeric",
      });
      console.log("password", adminpassword);

      await User.create({
        Id: emailId,
        Role: "admin",
        password: adminpassword,
      });
      return res
        .status(200)
        .json({ AdminEmailId: emailId, password: adminpassword });
    } else {
      return res
        .status(401)
        .json({ message: "emailId provided was undefined" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
module.exports = Router;
