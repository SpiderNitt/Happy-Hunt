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
  members: {
    type: Array,
    required: true,
  },
  activityFeed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ActivityFeed",
    },
  ],
});
module.exports = mongoose.model("Team", TeamSchema);
