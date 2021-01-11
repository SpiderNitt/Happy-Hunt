const auth = require("express").Router();
const player = require("./routers/PlayerAuth");
const commonAuth = require("./routers/commonAuth");

auth.use("/player", player);
auth.use("/", commonAuth);

module.exports = auth;
