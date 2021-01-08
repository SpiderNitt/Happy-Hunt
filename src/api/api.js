const api = require("express").Router();
const scoreboard = require("./routers/scoreboard");

const admin = require("./routers/Admin_route");
const missionroute = require("./routers/mission");

const NewAdmin = require("./routers/Create_admin");
const GetActivities = require("./routers/activity");
const deleteAdmin = require("./routers/delete_admin");
const playerSubmission = require("./routers/Player_submission");
const { jwtVerify } = require("../middlewares/jwt");

api.use("/", jwtVerify);
api.use("/create_admin", NewAdmin);
api.use("/delete_admin", deleteAdmin);
api.use("/mission", missionroute);
api.use("/scoreboard", scoreboard);

api.use("/admin", admin);
api.use("/activity", GetActivities);
api.use("/player", playerSubmission);

module.exports = api;
