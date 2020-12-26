const Router = require("express").Router();
const cryptoRandomString = require("crypto-random-string");
const User = require("../../database/models/User");

Router.get("/", async (req, res) => {
  try {
    // creating random adminID
    let adminID = cryptoRandomString({ length: 5, type: "numeric" });

    while (await User.findOne({ Id: adminID })) {
      adminID = cryptoRandomString({ length: 5, type: "numeric" });
    }
    console.log("adminID", adminID);

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
    return res.status(200).json({ AdminID: adminID, password: adminpassword });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Server Error ",
    });
  }
});
module.exports = Router;
