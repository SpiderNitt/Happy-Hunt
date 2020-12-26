const cron = require("node-cron");

cron.schedule("*/30 * * * *", () => {
  console.log("hii");
});
module.exports = cron;
