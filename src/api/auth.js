const auth = require("express").Router();
const NewAdmin = require("./routers/Create_admin");
const AdminRouter = require("./routers/Admin_auth");
const player = require("./routers/Player_auth");
const team = require("./routers/teamRouter");

auth.use("/login/admin", AdminRouter);
auth.use("/create_admin", NewAdmin);
auth.use("/player", player);
auth.use("/team", team);
module.exports = auth;
