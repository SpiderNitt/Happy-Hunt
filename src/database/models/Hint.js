const { Schema, model } = require("mongoose");

const HintSchema = new Schema({
  Content: {
    type: String,
    required: true,
  },
  MaxPoints: {
    type: Number,
    required: true,
  },
});
module.exports = model("Hint", HintSchema);
