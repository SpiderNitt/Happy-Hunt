const api = require("express").Router();

const scoreboard = require("./routers/scoreboard");
const missionroute = require("./routers/mission");
const hintRoute = require("./routers/Get_Hint");
const GetActivities = require("./routers/activity");
const playerSubmission = require("./routers/Player_submission");
const { jwtVerify } = require("../middlewares/jwt");

api.use("/", jwtVerify);

api.use("/hint", hintRoute);
api.use("/mission", missionroute);
api.use("/scoreboard", scoreboard);
api.use("/activity", GetActivities);
api.use("/player", playerSubmission);
module.exports = api;
