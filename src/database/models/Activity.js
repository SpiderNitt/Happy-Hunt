const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  team: {
    type: mongoose.Types.ObjectId,
    ref: "Team",
  },
  Answer: {
    type: String,
    // required: true,
  },
  category: {
    type: String,
    // required: true,
  },
  status: {
    type: String, // pending/accepted
    // required: true,
  },
  ShouldBeShown: {
    type: Boolean,
    // required: true,
  },
  likes: {
    type: Number,
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
