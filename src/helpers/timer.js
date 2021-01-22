/* eslint-disable no-await-in-loop */
const express = require("express");

const app = express();
const server = require("http").createServer(app);
require("../database/setup");

const options = {
  /* ... */
};
const io = require("socket.io")(server, options);

const Mission = require("../database/models/Mission");
const Team = require("../database/models/Team");

let counter = 0;
let BonusMission100;
let BonusMission200;

const BonusAsync = async () => {
  BonusMission200 = await Mission.find({
    isBonus: true,
    maxPoints: 200,
  });
  BonusMission100 = await Mission.find({
    isBonus: true,
    maxPoints: 100,
  });
};

const missionGenerator = async (points, teams, category, idList) => {
  let result = null;
  let lat = 0;
  let long = 0;
  while (result == null) {
    lat += 0.009;
    long += 0.00947;
    const lattop = teams.avgLocation.Lat + lat;
    const latbot = teams.avgLocation.Lat - lat;
    const longtop = teams.avgLocation.Long + long;
    const longbot = teams.avgLocation.Long - long;
    result = await Mission.findOne({
      maxPoints: points,
      "Location.Lat": {
        $lt: lattop,
        $gt: latbot,
      },
      "Location.Long": {
        $lt: longtop,
        $gt: longbot,
      },
      "assignedTeams.9": { $exists: false },
      Category: { $nin: category },
      _id: { $nin: idList },
    });
  }
  return result;
};
// 0.009 latitude =1km 0.00947 longitude =1 km
BonusAsync();
setInterval(async () => {
  console.log("started");
  io.emit("missions");
  const teams = await Team.find({});
  // mission distribution
  for (let index = 0; index < teams.length; index += 1) {
    const category = [];
    const mission1 = await missionGenerator(
      100,
      teams[index],
      category,
      teams[index].assignedMissions
    );
    teams[index].assignedMissions.push(mission1._id);
    await teams[index].save();
    category.push(mission1.Category);
    const mission2 = await missionGenerator(
      100,
      teams[index],
      category,
      teams[index].assignedMissions
    );
    teams[index].assignedMissions.push(mission2._id);
    await teams[index].save();
    category.push(mission2.Category);
    const mission3 = await missionGenerator(
      200, // there are no 200 points mission
      teams[index],
      category,
      teams[index].assignedMissions
    );
    teams[index].assignedMissions.push(mission3._id);
    await teams[index].save();
    teams[index].assignedBonus.push(BonusMission100[counter]._id);
    teams[index].assignedBonus.push(BonusMission200[counter]._id);
    await teams[index].save();
  }
  counter += 1;
}, 1800000);

module.exports = { app, io };
