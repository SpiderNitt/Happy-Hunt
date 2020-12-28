const api = require("express").Router();

const scoreboard = require("./routers/scoreboard");
const admin = require("./routers/Admin_route");

api.use("/scoreboard", scoreboard);
api.use("/admin", admin);
module.exports = api;
