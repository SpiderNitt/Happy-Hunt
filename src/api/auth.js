const auth = require("express").Router();
const NewAdmin = require("./routers/Create_admin");
const AdminRouter = require("./routers/Admin_auth");

auth.use("/login/admin", AdminRouter);
auth.use("/create_admin", NewAdmin);
module.exports = auth;
