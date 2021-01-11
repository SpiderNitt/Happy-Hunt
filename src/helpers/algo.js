const { getDistance } = require('geolib');
const Team = require('../database/models/Team');
const Mission = require('../database/models/Mission');

const teams = await Team.find({});
const missions = await Mission.find({});
const x = 500;
console.log(Date.now());
const getdistance = (teamLocation, missionLocation) => {
  const distance = getDistance(
    {
      latitude: teamLocation.Lat,
      longitude: teamLocation.Long,
    },
    {
      latitude: missionLocation.Lat,
      longitude: missionLocation.Long,
    }
  );

  return distance;
};
// stage 0
for (let index = 0; index < teams.length; index++) {
  teams[index].assignedmissions = [];
  teams[index].save();
}
for (let index = 0; index < missions.length; index++) {
  missions[index].assignedTeams = [];
  missions[index].save();
}
// stage 1
teamLoop: for (let index = 0; index < teams.length; index++) {
  for (let i = 0; i < missions.length; i++) {
    if (missions[i].assignedTeams.length < 10) {
      // Test 1 if assigned Teams are more than 10 then to next mission
      if (teams[index].assignedMissions.length >= 5) {
        continue teamLoop;
      }

      if (!teams[index].missionHistory.includes(mission[i]._id)) {
        let distance = getdistance(
          teams[index].avgLocation,
          missions[i].Location
        );
        let targetDistance = 1000;
        while (distance > targetDistance) {
          const assignedmissions = teams[index].assignedMissions;
          let count = 0;
          let missionToCheck = await Mission.find({})
            .where('_id')
            .in(assignedmissions)
            .exec();
          for (let k = 0; k < assignedmissions.length; k++) {
            if (missionToCheck[k].Category === missions[i].Category) {
              count++;
            }
          }
          if (count < 2) {
            // test 4
            // all test passed
            teams[index].assignedMissions.push(missions[i]._id);
            missions[i].assignedTeams.push(teams[index]._id);
            teams[index].missionHistory.push(missions[i]._id);
            teams[index].save();
            missions[index].save();
            // adding the mission in history
          }
        }
      }
    }
  }
}

console.log(Date.now());
