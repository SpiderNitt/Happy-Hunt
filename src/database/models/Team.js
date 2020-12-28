const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
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
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  AssignedSet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Set",
  },
});
module.exports = mongoose.model("Team", TeamSchema);
