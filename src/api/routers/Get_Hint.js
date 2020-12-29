const Router = require("express").Router();
const Team = require("../../database/models/Team");
const Mission = require("../../database/models/Mission");

Router.get("/", async (req, res) => {
  let { Mission_Id } = req.body;
  let mission = await Mission.findById(Mission_Id);
});

module.exports = Router;
