const { Schema, model } = require("mongoose");

const HintSchema = new Schema({
  Hint: {
    type: String,
    required: true,
  },
});
module.exports = model("Hint", HintSchema);
