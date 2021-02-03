const geolib = require("geolib");
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
  // uncomment this for reseting the database
  // await Team.updateMany(
  //   {},
  //   { $unset: { assignedMissions: 1, assignedBonus: 1 } }
  // );
  // await Mission.updateMany({}, { $unset: { assignedTeams: 1 } });
};

const missionGenerator = async (points, teams, category) => {
  if (!teams.avgLocation.Lat || !teams.avgLocation.Long) {
    console.log(`Location not there for team${teams.teamName}`);
    return { _id: null };
  }
  const result = await Mission.find({
    maxPoints: points,
    isBonus: false,
    "assignedTeams.9": { $exists: false },
    Category: { $nin: category },
    _id: { $nin: teams.assignedMissions },
  });
  if (result.length === 0) {
    console.log("No missions found");
    return { _id: null };
  }
  let distance = 100000000000;
  let mission;
  for (let i = 0; i < result.length; i += 1) {
    const missionDistance = geolib.getDistance(
      { latitude: teams.avgLocation.Lat, longitude: teams.avgLocation.Long },
      { latitude: result[i].Location.Lat, longitude: result[i].Location.Long }
    );
    if (missionDistance < distance) {
      distance = missionDistance;
      mission = result[i];
    }
  }

  return mission;
};
// 0.009 latitude =1km 0.00947 longitude =1 km
BonusAsync();
const algo = async () => {
  const teams = await Team.find({});
  // mission distribution
  for (let index = 0; index < teams.length; index += 1) {
    const category = [];
    const mission1 = await missionGenerator(100, teams[index], category);
    teams[index].assignedMissions.push(mission1._id);
    await teams[index].save();
    await Mission.findByIdAndUpdate(mission1._id, {
      $push: { assignedTeams: teams[index]._id },
    });
    category.push(mission1.Category);
    const mission2 = await missionGenerator(100, teams[index], category);
    teams[index].assignedMissions.push(mission2._id);
    await teams[index].save();
    await Mission.findByIdAndUpdate(mission2._id, {
      $push: { assignedTeams: teams[index]._id },
    });
    category.push(mission2.Category);
    const mission3 = await missionGenerator(200, teams[index], category); // 200 missions dont exist
    teams[index].assignedMissions.push(mission3._id);
    await teams[index].save();
    await Mission.findByIdAndUpdate(mission3._id, {
      $push: { assignedTeams: teams[index]._id },
    });
    // bonus missions
    if (BonusMission100.length <= counter) {
      console.log("No bonus missions found");
    } else {
      teams[index].assignedBonus.push(BonusMission100[counter]._id);
    }
    if (BonusMission200.length <= counter) {
      console.log("No bonus missions found");
    } else {
      teams[index].assignedBonus.push(BonusMission200[counter]._id);
    }
    await teams[index].save();
  }
  counter += 1;
  io.emit("missions");
  const algorithm = setInterval(async () => {
    // mission distribution
    for (let index = 0; index < teams.length; index += 1) {
      const category = [];
      const mission1 = await missionGenerator(100, teams[index], category);
      teams[index].assignedMissions.push(mission1._id);
      await teams[index].save();
      await Mission.findByIdAndUpdate(mission1._id, {
        $push: { assignedTeams: teams[index]._id },
      });
      category.push(mission1.Category);
      const mission2 = await missionGenerator(100, teams[index], category);
      teams[index].assignedMissions.push(mission2._id);
      await teams[index].save();
      await Mission.findByIdAndUpdate(mission2._id, {
        $push: { assignedTeams: teams[index]._id },
      });
      category.push(mission2.Category);
      const mission3 = await missionGenerator(200, teams[index], category); // 200 missions dont exist
      teams[index].assignedMissions.push(mission3._id);
      await teams[index].save();
      await Mission.findByIdAndUpdate(mission3._id, {
        $push: { assignedTeams: teams[index]._id },
      });
      // bonus missions
      if (BonusMission100.length <= counter) {
        console.log("No bonus missions found");
      } else {
        teams[index].assignedBonus.push(BonusMission100[counter]._id);
      }
      if (BonusMission200.length <= counter) {
        console.log("No bonus missions found");
      } else {
        teams[index].assignedBonus.push(BonusMission200[counter]._id);
      }
      await teams[index].save();
    }
    counter += 1;
    io.emit("missions");
    if (counter === 3) {
      clearInterval(algorithm);
      console.log("All missions assigned to all teams");
    }
  }, 30000);
};
module.exports = algo;
