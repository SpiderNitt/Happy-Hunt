const payment = require("express").Router();
const { uid } = require("uid");
const Team = require("../../database/models/Team");
const User = require("../../database/models/User");
const { sendEmail } = require("../../helpers/EMAIL/SGemail");

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
        console.log(`${phoneNo}(${emailId}) cant be found`);
        return res.status(200).json({ message: "Success" });
      }
    }
    let result;
    if (amount >= 399 && amount < 499)
      result = await User.updateOne({ emailId }, { Paid: 4 });
    else if (amount >= 499)
      result = await User.updateOne({ emailId }, { Paid: 6 });
    if (result.nModified === 1) {
      return res.status(200).json({ message: "Success" });
    }
    console.log(`${phoneNo}(${emailId}) has already paid and is paying again`);
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "Server error, try again later" });
  }
});
payment.post("/payment_1", async (req, res) => {
  try {
    const emailId = req.body.emailID;
    const phoneNo = req.body.phoneNumber;
    const quantity = req.body.totalTicketQuantity;
    const transId = req.body.transID;
    await sendEmail(
      "paarthiban7201@gmail.com",
      "User payment details",
      `Transaction Id: ${transId}`,
      "<h1>hello<h1>"
    );
    if (quantity !== 4 && quantity !== 6) {
      return res
        .status(200)
        .json({ successBool: false, errors: "Invalid totalTicketQuantity" });
    }
    const user = await User.findOne({ emailId });
    if (!user) {
      const password = uid();
      await User.create({
        emailId,
        phoneNo,
        password,
        /* active: true, */
        isEmailVerified: true,
        Role: "Player",
        Paid: quantity,
      });
      await sendEmail(
        emailId,
        "USER created",
        `sucess`,
        `<body style="font-family: tahoma"><h2>Greetings from Happy Hunt!</h2><h4>Payment Successful!</h4><p>Congratulations! You have successfully registered for the hunt.</p><p>your password is ${password}</p><p>You can join a team or create one to start the hunt.</p><p style="color:navy">Happy hunting!</p></body>`
      );
      return res.status(200).json({ successBool: true });
    }
    let result;
    if (user.team)
      result = await Team.updateOne({ _id: user.team }, { Paid: quantity });
    else result = await User.updateOne({ emailId }, { Paid: quantity });
    if (result.nModified === 1) {
      return res.status(200).json({ successBool: true });
    }
    console.log(`Payment not updated for ${phoneNo},${emailId}`);
    return res.status(200).json({ successBool: true });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ successBool: false, errors: "Internal error" });
  }
});
module.exports = payment;
