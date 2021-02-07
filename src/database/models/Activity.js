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
    // Picture/Video/Picture and Location /Text
    type: String,
  },

  ispart: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean, // pending - 0/accepted - 1
  },
  likes: {
    type: Number,
    default: 0,
  },
  likeList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
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
  Date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Activity", activitySchema);
