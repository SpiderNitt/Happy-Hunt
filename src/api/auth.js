const auth = require("express").Router();
const AdminRouter = require("./routers/AdminAuth");
const player = require("./routers/PlayerAuth");

auth.use("/admin", AdminRouter);
auth.use("/player", player);

module.exports = auth;
