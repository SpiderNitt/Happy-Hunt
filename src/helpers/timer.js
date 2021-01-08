/* eslint-disable no-await-in-loop */
const express = require("express");

const app = express();
const server = require("http").createServer(app);
require("../database/setup");

const options = {
  /* ... */
};
const io = require("socket.io")(server, options);
const Set = require("../database/models/Set");
const team = require("../database/models/Team");

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
    }
  }
  console.log("complete");
}, 1800000);

module.exports = { app, io };
