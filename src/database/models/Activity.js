const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  team: {
    type: mongoose.Types.ObjectId,
    ref: "Team",
  },
  Answer: {
    type: String,
  },
  category: {
    type: String,
  },
  status: {
    type: String, // pending/accepted
  },
  likes: {
    type: Number,
    default: 0,
  },
  mission: {
    type: mongoose.Types.ObjectId,
    ref: "Mission",
  },
  location: {
    Lat: {
      type: String,
    },
    Long: {
      type: String,
    },
  },
  hintsTaken: {
    type: Number,
  },
  isSubmitted: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Activity", activitySchema);
