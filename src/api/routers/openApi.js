const openApi = require("express").Router();
const { uid } = require("uid");
const Team = require("../../database/models/Team");
const Mission = require("../../database/models/Mission");
const User = require("../../database/models/User");
const Hint = require("../../database/models/Hint");
const { sendEmail } = require("../../helpers/EMAIL/nodemailer");

openApi.get("/scoreboard", async (req, res) => {
  try {
    const teamScore = await Team.find()
      .sort({ points: -1 })
      .populate("members", "name -_id")
      .select("teamName points -_id members");
    return res.status(200).json(teamScore);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Server Error, Try again later" });
  }
});
openApi.get("/mission/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mission = await Mission.findById(id);
    if (!mission) {
      return res.status(404).json({ message: "Mission not found" });
    }
    const hint = [];
    let i;
    for (i = 0; i < mission.Hints.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const result = await Hint.findById(mission.Hints[i]);
      hint.push(result);
    }
    const result = { mission, hint };
    return res.status(200).json(result);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ Message: "Server Error, Try again later" });
  }
});
openApi.post("/payment", async (req, res) => {
  try {
    const emailId = req.body.payload.payment.email;
    const phoneNo = req.body.payload.payment.contact;
    const { amount } = req.body.payload.payment;
    let user = await User.findOne({ emailId });
    if (!user) {
      user = await User.findOne({ phoneNo });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }
    let result;
    if (user.team) {
      if (amount >= 399 && amount < 499)
        result = await Team.updateOne({ _id: user.team }, { Paid: 4 });
      else if (amount >= 499)
        result = await Team.updateOne({ _id: user.team }, { Paid: 6 });
    } else if (amount >= 399 && amount < 499)
      result = await User.updateOne({ emailId }, { Paid: 4 });
    else if (amount >= 499)
      result = await User.updateOne({ emailId }, { Paid: 6 });
    if (result.nModified === 1) {
      return res.status(200).json({ message: "Success" });
    }
    return res.status(400).json({ message: "Unable to update record" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
openApi.post("/payment_1", async (req, res) => {
  try {
    const emailId = req.body.emailID;
    const phoneNo = req.body.phoneNumber;
    const quantity = req.body.totalTicketQuantity;
    let user = await User.findOne({ emailId });
    if (!user) {
      user = await User.findOne({ phoneNo });
      if (!user) {
        const password = uid();
        const user = await User.create({
          emailId,
          phoneNo,
          password,
          active: true,
          Role: "Player",
          Paid: quantity,
        });
        await sendEmail(
          emailId,
          "USER created",
          `password:${password}`,
          "<h1>hello</h1>"
        );
        return res.status(200).json({ message: "Success" });
      }
    }
    let result;
    if (user.team)
      result = await Team.updateOne({ _id: user.team }, { Paid: quantity });
    else result = await User.updateOne({ emailId }, { Paid: quantity });
    if (result.nModified === 1) {
      return res.status(200).json({ message: "Success" });
    }
    return res.status(400).json({ message: "Unable to update record" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
openApi.get("/adminList", async (req, res) => {
  try {
    const adminList = await User.find({ Role: "Admin" });
    if (!adminList)
      return res.status(404).json({ message: "Admin list is empty" });
    return res.status(200).json(adminList);
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server Error, Try again later" });
  }
});
module.exports = openApi;
