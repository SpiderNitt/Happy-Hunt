const cron = require("node-cron");
const { io } = require("./timer");

cron.schedule("0 10 * * *", () => {
  io.emit("start");
  // start our algo
});

cron.schedule("0 13 * * *", () => {
  io.emit("end");
});

module.exports = cron;
