/* eslint-disable no-await-in-loop */
const express = require("express");

const app = express();
const server = require("http").createServer(app);
require("../database/setup");

const options = {
  /* ... */
};
const io = require("socket.io")(server, options);
<<<<<<< HEAD
const Set = require("../database/models/Set");
const team = require("../database/models/Team");

io.on("connection", (socket) => {
  console.log("Socket connected successfully");
});
setInterval(async () => {
  io.emit("missions");

  const teams = await team.find({});
  const sets = await Set.find({});
  let teamcount = teams.length;

  for (let i = 0; i < sets.length; i++) {
    console.log(i);
    if (teamcount === 1) {
      sets[i].AssignedTeams.push(teams[teamcount - 1]);
      teams[teamcount - 1].AssignedSet = sets[i];

      await teams[teamcount - 1].save();
      await sets[i].save();

      break;
    }
    if (teamcount === 3) {
      sets[i].AssignedTeams.push(teams[teamcount - 1]);
      sets[i].AssignedTeams.push(teams[teamcount - 2]);
      sets[i].AssignedTeams.push(teams[teamcount - 3]);
      teams[teamcount - 3].AssignedSet = sets[i];
      teams[teamcount - 1].AssignedSet = sets[i];
      teams[teamcount - 2].AssignedSet = sets[i];

      await teams[teamcount - 3].save();
      await teams[teamcount - 1].save();
      await teams[teamcount - 2].save();
      await sets[i].save();

      break;
    }
    if (teamcount === 2) {
      sets[i].AssignedTeams.push(teams[teamcount - 2]);
      sets[i].AssignedTeams.push(teams[teamcount - 1]);
      teams[teamcount - 2].AssignedSet = sets[i];
      teams[teamcount - 1].AssignedSet = sets[i];

      await teams[teamcount - 1].save();
      await teams[teamcount - 2].save();
      await sets[i].save();

      break;
    }
    if (teamcount >= 4) {
      sets[i].AssignedTeams.push(teams[teamcount - 1]);
      sets[i].AssignedTeams.push(teams[teamcount - 2]);
      sets[i].AssignedTeams.push(teams[teamcount - 3]);
      sets[i].AssignedTeams.push(teams[teamcount - 4]);
      teams[teamcount - 4].AssignedSet = sets[i];
      teams[teamcount - 1].AssignedSet = sets[i];
      teams[teamcount - 2].AssignedSet = sets[i];
      teams[teamcount - 3].AssignedSet = sets[i];

      await teams[teamcount - 4].save();
      await teams[teamcount - 1].save();
      await teams[teamcount - 2].save();
      await teams[teamcount - 3].save();
      await sets[i].save();

      teamcount -= 4;
=======
const { getDistance } = require("geolib");
const Mission = require("../database/models/Mission");
const Team = require("../database/models/Team");

io.on("connection", async (socket) => {
  const teams = await team.find({});
  for (const team of teams) {
    socket.on("Admin " + team.id, (notification) => {
      socket.emit("Notifications " + team.id, notification);
    });
  }
  console.log("Socket connected successfully");
});

setInterval(async () => {
  io.emit("missions");
  const teams = await Team.find({});
  const missions = await Mission.find({});
  const x = 500;
  // stage 0
  for (let index = 0; index < teams.length; index++) {
    teams[index].maxPointsAssigned = 0;
    teams[index].assignedMissions = [];
    await teams[index].save();
  }
  for (let index = 0; index < missions.length; index++) {
    missions[index].assignedTeams = [];
    await missions[index].save();
  }
  // stage 1
  for (let index = 0; index < teams.length; index++) {
    for (let i = 0; i < missions.length; i++) {
      if (teams[index].assignedMissions.length < 5) {
        // test 0
        if (!teams[index].missionHistory.includes(missions[i]._id)) {
          // test 1
          const distance = getDistance(
            {
              latitude: teams[index].avgLocation.Lat,
              longitude: teams[index].avgLocation.Long,
            },
            {
              latitude: missions[i].Location.Lat,
              longitude: missions[i].Location.Long,
            }
          );
          // console.log(distance);
          if (distance < 1000) {
            // test 2
            if (missions[i].assignedTeams.length < 10) {
              // test 3
              const assignedmissions = teams[index].assignedMissions;
              let count = 0;
              for (let k = 0; k < assignedmissions.length; k++) {
                let missionToCheck = await Mission.findById(
                  assignedmissions[k]
                );
                if (missionToCheck.Category === missions[i].Category) {
                  count++;
                }
              }
              if (count < 2) {
                // test 4
                if (
                  teams[index].maxPointsAssigned + missions[i].maxPoints <=
                  x
                ) {
                  // all test passed
                  console.log("all test passed");
                  teams[index].assignedMissions.push(missions[i]._id);
                  missions[i].assignedTeams.push(teams[index]._id);
                  teams[index].maxPointsAssigned += missions[i].maxPoints;

                  // adding the mission in history
                  teams[index].missionHistory.push(missions[i]._id);
                  await teams[index].save();
                  await missions[i].save();
                }
              }
            }
          }
        }
      }
>>>>>>> 559c65d3157f73dfb4dcf3d1523c6e15320b4aee
    }
  }
  console.log("complete");
}, 1800000);

<<<<<<< HEAD
module.exports = { app };
=======
module.exports = { app, io };
>>>>>>> 559c65d3157f73dfb4dcf3d1523c6e15320b4aee
