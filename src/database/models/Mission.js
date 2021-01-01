const { Schema, model } = require("mongoose");

const MissionSchema = new Schema({
  Category: {
    type: String, // Picture/Video/Picture and Location /Text
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
  maxPoints: {
    type: Number,
    required: true,
  },
});
module.exports = model("Mission", MissionSchema);
