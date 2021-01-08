const api = require("express").Router();
const scoreboard = require("./routers/scoreboard");
const missionroute = require("./routers/AdminMission");
const team = require("./routers/teamRouter");
const Admin = require("./routers/AdminRoute");
const GetActivities = require("./routers/activity");
const playerSubmission = require("./routers/PlayerSubmission");
const { jwtVerify } = require("../middlewares/jwt");

api.use("/", jwtVerify);

<<<<<<< HEAD
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
=======
// comman route
api.use("/scoreboard", scoreboard);
api.use("/activity", GetActivities);

// team routes
api.use("/team", team);

// only for admin
api.use("/admin/mission", missionroute);
api.use("/admin", Admin);

// only for team
>>>>>>> 559c65d3157f73dfb4dcf3d1523c6e15320b4aee
api.use("/player", playerSubmission);

module.exports = api;
