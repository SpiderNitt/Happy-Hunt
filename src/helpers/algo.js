/* eslint-disable no-await-in-loop */

// to be added in event scedule
const Geo = require("geo-nearby");
const Mission = require("../database/models/Mission");
const Team = require("../database/models/Team");
const { io } = require("./timer");

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
  /*                            uncomment this for reseting the database
  await Team.updateMany(
    {},
    { $unset: { assignedMissions: 1, assignedBonus: 1 } }
  );
  await Mission.updateMany({}, { $unset: { assignedTeams: 1 } }); */
  // console.log(BonusMission100);
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
  // console.log(distance);
  // console.log(mission);
  return mission[0];
};
// 0.009 latitude =1km 0.00947 longitude =1 km
try {
  BonusAsync();
  const algo = setInterval(async () => {
    if (counter > 2) {
      clearInterval(algo);
    }
    const teams = await Team.find({});
    // mission distribution
    for (let index = 0; index < teams.length; index += 1) {
      console.log(index);
      const category = [];
      const mission1 = await missionGenerator(100, teams[index], category);
      if (typeof mission1 !== "undefined") {
        teams[index].assignedMissions.push(mission1.i);
        await teams[index].save();
        const missionUpdate = await Mission.findByIdAndUpdate(mission1.i, {
          $push: { assignedTeams: teams[index]._id },
        });
        category.push(missionUpdate.Category);
      } else {
        console.log("No more 100 missions");
      }
      const mission2 = await missionGenerator(100, teams[index], category);
      // console.log(mission2);
      if (typeof mission2 !== "undefined") {
        teams[index].assignedMissions.push(mission2.i);
        await teams[index].save();
        const missionUpdate = await Mission.findByIdAndUpdate(mission2.i, {
          $push: { assignedTeams: teams[index]._id },
        });
        category.push(missionUpdate.Category);
      } else {
        console.log("No more 100 missions");
      }
      const mission3 = await missionGenerator(200, teams[index], category); // 200 missions dont exist
      if (typeof mission3 !== "undefined") {
        teams[index].assignedMissions.push(mission3.i);
        await teams[index].save();
        await Mission.findByIdAndUpdate(mission3.i, {
          $push: { assignedTeams: teams[index]._id },
        });
      } else {
        console.log("No more 100 missions");
      }
      // bonus missions
      teams[index].assignedBonus.push(BonusMission100[counter]._id);
      teams[index].assignedBonus.push(BonusMission200[counter]._id);
      await teams[index].save();
    }
    counter += 1;
    io.emit("missions");
    algo();
  }, 1800000);
} catch (e) {
  console.log(e.msg);
}
