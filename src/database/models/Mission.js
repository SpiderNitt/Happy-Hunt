const { Schema, model } = require("mongoose");

const MissionSchema = new Schema({
  Category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  clue: {
    type: String,
    required: true,
  },
  answer_Type: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  Location: {
    Lat: {
      type: String,
    },
    Long: {
      type: String,
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
});
module.exports = model("Mission", MissionSchema);
