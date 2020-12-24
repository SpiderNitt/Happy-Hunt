const Router = require("express").Router();
const cryptoRandomString = require("crypto-random-string");
const User = require("../../database/models/User");

Router.get("/", async (req, res) => {
  try {
    // creating random adminID
    const adminID = cryptoRandomString({ length: 5, type: "numeric" });
    console.log("adminID", adminID);
    const user = await User.findOne({ Id: adminID });
    if (user !== null) {
      return res.status(400).json({
        message: "unable to create new admin",
        reason: "random adminId generated already exists",
        solution: "try again later",
      });
    }
    // creating random password
    const adminpassword = cryptoRandomString({
      length: 10,
      type: "alphanumeric",
    });
    console.log("password", adminpassword);

    await User.create({
      Id: adminID,
      Role: "admin",
      password: adminpassword,
    });
    return res.status(200).json({ message: "new admin created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
module.exports = Router;
