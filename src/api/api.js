const api = require("express").Router();
const MissionRouter = require("./routers/mission");

api.use("/mission", MissionRouter);

const scoreboard = require("./routers/scoreboard");

api.use("/scoreboard", scoreboard);
module.exports = api;
