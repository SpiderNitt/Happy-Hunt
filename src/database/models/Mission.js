const { Schema, model } = require("mongoose");

const MissionSchema = new Schema({
  Category: {
    type: String, // Picture/Video/Picture and Location /Text
    required: true,
  },
  MissionName: {
    type: String,
  },
  isBonus: {
    type: Boolean,
  },
  clue: {
    type: String,
    required: true,
  },
  answer_Type: {
    // Picture/Video/Picture and Location /Text
    type: String,
    required: true,
  },
  answer: [
    {
      type: String,
    },
  ],
  Location: {
    Lat: {
      type: Number,
    },
    Long: {
      type: Number,
    },
  },
  Other_Info: {
    type: String,
  },
  Hints: [
    {
      type: Schema.Types.ObjectId,
      ref: "Hint",
    },
  ],
  maxPoints: {
    type: Number,
    required: true,
  },
  Feed: {
    type: Boolean, // 1-visible 0- hidden
    required: true,
  },
  ServerEvaluation: {
    type: Boolean,
    required: true,
  },
  assignedTeams: [
    {
      type: Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
});
module.exports = model("Mission", MissionSchema);
