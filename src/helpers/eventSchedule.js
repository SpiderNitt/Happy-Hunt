const cron = require("node-cron");
const { io } = require("./timer");
const User = require("../database/models/User");
const { sendEmail } = require("./EMAIL/nodemailer");

cron.schedule("0 10 * * *", () => {
  io.emit("start");
  // start our algo
});

cron.schedule("0 13 * * *", () => {
  io.emit("end");
});
cron.schedule("0 13 * * *", async () => {
  const users = await User.find({});
  const n = users.length;
  for (let index = 0; index < n; index += 1) {
    await sendEmail(
      users[index].emailId,
      "one day left",
      "one day left for happy-hunt",
      "<h1>hello</h1>"
    );
  }
});

module.exports = cron;
