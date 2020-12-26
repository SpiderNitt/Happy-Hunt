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
  active: Boolean,
});
module.exports = mongoose.model("User", UserSchema);
