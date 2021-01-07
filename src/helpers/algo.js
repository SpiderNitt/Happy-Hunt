const { getDistance } = require("geolib");
const Team = require("../database/models/Team");
const Mission = require("../database/models/Mission");

const teams = await Team.find({});
const missions = await Mission.find({});
const x = 500;
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
        if (distance < 1000) {
          // test 2
          if (missions[i].assignedTeams.length < 10) {
            // test 3
            const assignedmissions = teams[index].assignedMissions;
            let count = 0;
            for (let k = 0; k < assignedmissions.length; k++) {
              let missionToCheck = await Mission.findById(assignedmissions[k]);
              if (missionToCheck.Category === missions[i].Category) {
                count++;
              }
            }
            if (count < 2) {
              // test 4
              if (teams[index].maxPointsAssigned + missions[i].maxPoints <= x) {
                // all test passed
                teams[index].assignedMissions.push(missions[i]._id);
                missions[i].assignedTeams.push(teams[index]._id);
                teams[index].save();
                missions[index].save();
                // adding the mission in history
                teams[index].missionHistory.push(missions[i]._id);
              }
            }
          }
        }
      }
    }
  }
}
