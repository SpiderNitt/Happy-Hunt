const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamId: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
    default: 100, // for intialization
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  activityFeed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActivityFeed",
    },
  ],
});
module.exports = mongoose.model("Team", TeamSchema);
