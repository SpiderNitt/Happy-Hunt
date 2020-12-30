const api = require("express").Router();

const scoreboard = require("./routers/scoreboard");
const missionroute = require("./routers/mission");
const hintRoute = require("./routers/Get_Hint");
const GetActivities = require("./routers/activity");

api.use("/hint", hintRoute);
api.use("/mission", missionroute);
api.use("/scoreboard", scoreboard);
api.use("/activity", GetActivities);

module.exports = api;
