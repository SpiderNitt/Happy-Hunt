const api = require("express").Router();

const scoreboard = require("./routers/scoreboard");
const hintRoute = require("./routers/Get_Hint");
const GetActivities = require("./routers/activity");

api.use("/hint", hintRoute);

api.use("/scoreboard", scoreboard);
api.use("/activity", GetActivities);

module.exports = api;
