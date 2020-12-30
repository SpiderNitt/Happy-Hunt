const api = require("express").Router();

const scoreboard = require("./routers/scoreboard");
const hintRoute = require("./routers/Get_Hint");

api.use("/scoreboard", scoreboard);
api.use("/hint", hintRoute);
module.exports = api;
