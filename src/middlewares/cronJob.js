const { async } = require("crypto-random-string");
const cron = require("node-cron");
const Mission = require("../database/models/Mission");

cron.schedule("*/2 * * * *", async () => {
  let buffer = []; // array conatining five Ids of one set which needs to be unlocked
  await buffer.forEach((element) => {
    let mission = Mission.findById(element);
    mission.status = "unlock";
    mission.save();
  });
});
module.exports = cron;
