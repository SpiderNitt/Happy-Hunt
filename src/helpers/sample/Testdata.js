require("../../database/setup");
const Team = require("../../database/models/Team");
const User = require("../../database/models/User");
const Mission = require("../../database/models/Mission");
const Hint = require("../../database/models/Hint");
const asyncFunc = async () => {
  try {
    const teams = await Team.find({});
    const users = await User.find({ Role: "player" });
    console.log(users.length);
    console.log(teams.length);
    let usercount = 0;
    for (let i = 0; i < teams.length; i++) {
      console.log(usercount, i);
      if (usercount < users.length) {
        console.log(usercount);
        teams[i].members = [];
        teams[i].members.push(users[usercount]);
        teams[i].members.push(users[usercount + 1]);
        teams[i].members.push(users[usercount + 2]);
        teams[i].members.push(users[usercount + 3]);
        usercount += 4;
        users[usercount].team = teams[i];
        users[usercount + 1].team = teams[i];
        users[usercount + 2].team = teams[i];
        users[usercount + 3].team = teams[i];
        await teams[i].save();
        await users[usercount].save();
        await users[usercount + 1].save();
        await users[usercount + 2].save();
        await users[usercount + 3].save();
      } else {
        await Team.findByIdAndDelete(teams[i]._id);
      }
    }
    const missions = await Mission.find({});
    const hints = await Hint.find({});
    let hintcount = 0;
    console.log(missions.length, hints.length);
    for (let i = 0; i < missions.length; i++) {
      console.log(i);
      if (hintcount < hints.length) {
        missions[i].Hints = [];
        missions[i].Hints.push(hints[hintcount]);
        missions[i].Hints.push(hints[hintcount + 1]);
        missions[i].Hints.push(hints[hintcount + 2]);
        missions[i].Hints.push(hints[hintcount + 3]);
        hintcount += 4;
        await missions[i].save();
      } else {
        await Mission.findByIdAndDelete(missions[i]._id);
      }
    }
  } catch (error) {
    console.error(error.message);
  }
};
asyncFunc();
