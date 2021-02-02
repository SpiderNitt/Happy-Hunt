const cron = require("node-cron");

const User = require("../database/models/User");
const { sendEmail } = require("./EMAIL/SGemail");

// put timing of one day before event
cron.schedule("0 13 * * *", async () => {
  const users = await User.find({});
  const n = users.length;
  for (let index = 0; index < n; index += 1) {
    await sendEmail(
      users[index].emailId,
      "One day left",
      "One day left for happy-hunt",
      `<body style="font-family: tahoma"><h2>Greetings from Happy Hunt!</h2><h4>Time to hunt..</h4><p>1 days to go for the hunt.</p><p>Be ready!!</p><p style="color:navy">Happy hunting!</p></body>`
    );
  }
});

module.exports = cron;
