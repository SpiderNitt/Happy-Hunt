const api = require("express").Router();
const path = require("path");
const openApi = require("./routers/openApi");
const missionroute = require("./routers/AdminMission");
const payment = require("./routers/payment");
const team = require("./routers/teamRouter");
const Admin = require("./routers/AdminRoute");
const GetActivities = require("./routers/activity");
const playerSubmission = require("./routers/PlayerSubmission");
const countDown = require("./routers/countdown");
const { jwtVerify } = require("../middlewares/jwt");

api.use("/", payment);
api.get("/image", (req, res) => {
  const { photo } = req.query;
  const picDirectory = path.join(__dirname, "../../");
  const picPath = path.join(picDirectory, photo);
  res.sendFile(picPath);
});
api.use("/", jwtVerify);

// comman route
api.use("/", openApi);
api.use("/activity", GetActivities);
api.use("/countdown", countDown);
// team routes
api.use("/team", team);

// only for admin
api.use("/admin/mission", missionroute);
api.use("/admin", Admin);

// only for team
api.use("/player", playerSubmission);

module.exports = api;
