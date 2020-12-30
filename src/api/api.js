const api = require("express").Router();

const scoreboard = require("./routers/scoreboard");
const GetActivities = require("./routers/activity");

api.use("/scoreboard", scoreboard);
api.use("/activity", GetActivities);

module.exports = api;
