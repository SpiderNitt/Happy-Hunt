const api = require("express").Router();

const scoreboard = require("./routers/scoreboard");

api.use("/scoreboard", scoreboard);
module.exports = api;
