const auth = require("express").Router();
const AdminRouter = require("./routers/Admin_auth");
const player = require("./routers/Player_auth");
const team = require("./routers/teamRouter");

auth.use("/admin", AdminRouter);
auth.use("/player", player);
auth.use("/team", team);

module.exports = auth;
