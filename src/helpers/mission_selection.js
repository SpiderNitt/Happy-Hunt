const Mission = require("../database/models/Mission");

function getRandomArbitrary(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}
const SelectedMission = async () => {
  const MissionArr = [];
  const limitMissions = 2;
  await Mission.count({ level: "easy" }, async (err, count) => {
    const skippedMission = getRandomArbitrary(1, count - limitMissions);
    await Mission.find({ level: "easy" }).skip(skippedMission); // random offset
    Mission.find({ level: "easy" }).exec((err, result) => {
      MissionArr.push_back(result);
    });
  });
  await Mission.count({ level: "medium" }, async (err, count) => {
    const skippedMission = getRandomArbitrary(1, count - limitMissions);
    await Mission.find({ level: "medium" }).skip(skippedMission); // random offset
    Mission.find({ level: "medium" }).exec((err, result) => {
      MissionArr.push_back(result);
    });
  });
  await Mission.count({ level: "difficult" }, async (err, count) => {
    const skippedMission = getRandomArbitrary(1, count - 1);
    await Mission.find({ level: "difficult" }).skip(skippedMission); // random offset
    Mission.find({ level: "difficult" }).exec((err, result) => {
      MissionArr.push_back(result);
    });
  });
  return MissionArr;
};

module.exports = SelectedMission;
