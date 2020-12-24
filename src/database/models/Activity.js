const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  team: {
    type: mongoose.Types.ObjectId,
    ref: "Team",
  },
  content: String,
  status: Boolean,
  count: Number,
  photo: String,
  hintsTaken: Number,
  answer: String,
});
