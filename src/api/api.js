const auth = require("express").Router();
const MissionRouter = require("./routers/mission");

auth.use("/mission", MissionRouter);
module.exports = auth;
