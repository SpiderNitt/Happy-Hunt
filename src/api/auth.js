const auth = require("express").Router();
<<<<<<< HEAD
const AdminRouter = require("./routers/Admin_auth");
const player = require("./routers/Player_auth");
const team = require("./routers/teamRouter");

auth.use("/admin", AdminRouter);
auth.use("/player", player);
auth.use("/team", team);
=======
const AdminRouter = require("./routers/AdminAuth");
const player = require("./routers/PlayerAuth");

auth.use("/admin", AdminRouter);
auth.use("/player", player);
>>>>>>> 559c65d3157f73dfb4dcf3d1523c6e15320b4aee

module.exports = auth;
