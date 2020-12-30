const api = require("express").Router();

const scoreboard = require("./routers/scoreboard");
const missionroute = require("./routers/mission");

api.use("/scoreboard", scoreboard);
api.use("/mission", missionroute);
module.exports = api;
