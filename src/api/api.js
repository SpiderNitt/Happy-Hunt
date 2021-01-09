const api = require("express").Router();
const scoreboard = require("./routers/scoreboard");
const missionroute = require("./routers/AdminMission");
const team = require("./routers/teamRouter");
const Admin = require("./routers/AdminRoute");
const GetActivities = require("./routers/activity");
const playerSubmission = require("./routers/PlayerSubmission");
const countDown = require("./routers/countdown");
const { jwtVerify } = require("../middlewares/jwt");

api.use("/", jwtVerify);

// comman route
api.use("/scoreboard", scoreboard);
api.use("/activity", GetActivities);
api.use("/countdown", countDown);
// team routes
api.use("/team", team);

// only for admin
api.use("/admin/mission", missionroute);
api.use("/admin", Admin);

// only for team
api.use("/player", playerSubmission);

module.exports = api;
