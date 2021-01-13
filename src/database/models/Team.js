const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
  },
  Paid: {
    type: Number,
    default: 0,
  },
  teamName: {
    type: String,
    require: true,
  },
  points: {
    type: Number,
    required: true,
    default: 0, // for intialization
  },
  assignedMissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
    },
  ],
  assignedBonus: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
    },
  ],
  missionHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
    },
  ],
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  avgLocation: {
    Lat: {
      type: Number,
    },
    Long: {
      type: Number,
    },
  },
  maxPointsAssigned: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Team", TeamSchema);
