const auth = require("express").Router();
const NewAdmin = require("./routers/Create_admin");
const AdminRouter = require("./routers/Admin_auth");
const player = require("./routers/Player_auth");
const team = require("./routers/teamRouter");
const deleteAdmin = require("./routers/delete_admin");

auth.use("/login/admin", AdminRouter);
auth.use("/create_admin", NewAdmin);
auth.use("/player", player);
auth.use("/team", team);
auth.use("/delete_admin", deleteAdmin);
module.exports = auth;
