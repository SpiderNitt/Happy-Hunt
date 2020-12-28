const express = require("express");
const app = express();

require("../database/setup");
//
// require("./src/helpers/timer");
const Set = require("../database/models/Set");
const team = require("../database/models/Team");

const server = require("http").createServer(app);

const options = {
  /* ... */
};
const io = require("socket.io")(server, options);

io.on("connection", (socket) => {
  console.log("Socket connected successfully");
});
setInterval(async () => {
  io.emit("missions");
  // here
  const teams = await team.find({});
  const sets = await Set.find({});
  let teamcount = teams.length;
  console.log(sets.length);
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

      teamcount -= 4;

      await teams[teamcount - 4].save();
      await teams[teamcount - 1].save();
      await teams[teamcount - 2].save();
      await teams[teamcount - 3].save();
      await sets[i].save();
    }
  }
}, 1800000);

module.exports = { app };
