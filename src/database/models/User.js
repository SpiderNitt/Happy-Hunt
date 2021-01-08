const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  Role: { type: String, required: true }, // TeamLeader , TeamMember , Admin , SuperAdmin,
  Id: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  photo: {
    type: String,
  },
  phoneNo: {
    type: String,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  active: Boolean,
});
module.exports = mongoose.model("User", UserSchema);
