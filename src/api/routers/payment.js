const payment = require("express").Router();
const { uid } = require("uid");
const Team = require("../../database/models/Team");
const User = require("../../database/models/User");
const { sendEmail } = require("../../helpers/EMAIL/nodemailer");

payment.post("/payment", async (req, res) => {
  try {
    const emailId = req.body.payload.payment.entity.email;
    const phoneNo = req.body.payload.payment.entity.contact;
    let { amount } = req.body.payload.payment.entity;
    amount /= 100;
    let user = await User.findOne({ emailId });
    if (!user) {
      user = await User.findOne({ phoneNo });
      if (!user) {
        return res.status(404);
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
      return res.status(200);
    }
    return res.status(400);
  } catch (err) {
    console.log(err.message);
    return res.status(500);
  }
});
payment.post("/payment_1", async (req, res) => {
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
module.exports = payment;
