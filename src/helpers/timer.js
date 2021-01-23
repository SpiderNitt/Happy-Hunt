/* eslint-disable no-await-in-loop */
const express = require("express");
const Geo = require("geo-nearby");

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
    maxPoints: 200, // 120
  });
  BonusMission100 = await Mission.find({
    isBonus: true,
    maxPoints: 100, // 120
  });
  /* await Team.updateMany(
    {},
    { $unset: { assignedMissions: 1, assignedBonus: 1 } }
  );
  console.log(BonusMission100); */
};

const missionGenerator = async (points, teams, category) => {
  const result = await Mission.find({
    maxPoints: points,
    "assignedTeams.9": { $exists: false },
    Category: { $nin: category },
    _id: { $nin: teams.assignedMissions },
  });
  const dataSet = Geo.createCompactSet(result, {
    id: "_id",
    lat: ["Location", "Lat"],
    lon: ["Location", "Long"],
  });
  const geo = new Geo(dataSet, { sorted: true });
  let mission = [];
  let distance = 1000;
  while (!mission.length) {
    distance += 1000;
    mission = geo.nearBy(
      teams.avgLocation.Lat,
      teams.avgLocation.Long,
      distance
    );
  }
  // console.log(mission);
  return mission[0];
};
// 0.009 latitude =1km 0.00947 longitude =1 km
BonusAsync();
setInterval(async () => {
  io.emit("missions");
  const teams = await Team.find({});
  // mission distribution
  for (let index = 0; index < teams.length; index += 1) {
    console.log(index);
    const category = [];
    const mission1 = await missionGenerator(100, teams[index], category);
    teams[index].assignedMissions.push(mission1.i);
    await teams[index].save();
    category.push(mission1.Category);
    const mission2 = await missionGenerator(100, teams[index], category);
    teams[index].assignedMissions.push(mission2.i);
    await teams[index].save();
    category.push(mission2.Category);
    const mission3 = await missionGenerator(200, teams[index], category); // 200 missions dont exist
    teams[index].assignedMissions.push(mission3.i);
    await teams[index].save();
    // bonus missions
    teams[index].assignedBonus.push(BonusMission100[counter]._id);
    teams[index].assignedBonus.push(BonusMission200[counter]._id);
    await teams[index].save();
  }
  counter += 1;
  console.log("done");
}, 1800000);

module.exports = { app, io };
