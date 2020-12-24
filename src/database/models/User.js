const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  Role: { type: String, required: true },
  Id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
  },
  age: {
    type: Number,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});
module.exports = mongoose.model("User", UserSchema);
