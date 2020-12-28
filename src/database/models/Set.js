const { Schema, model } = require("mongoose");

const SetSchema = new Schema({
  Missions: [
    {
      type: Schema.ObjectId,
      ref: "Mission",
    },
  ],
  AssignedTeams: [
    {
      type: Schema.ObjectId,
      ref: "Team",
    },
  ],
});
module.exports = model("Set", SetSchema);
