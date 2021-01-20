const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  Role: { type: String, required: true }, // TeamLeader , TeamMember , Admin , SuperAdmin,
  Paid: {
    type: Number,
    default: 0,
  },
  emailId: {
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
  Location: {
    Lat: {
      type: Number,
    },
    Long: {
      type: Number,
    },
  },
  active: Boolean,
});
module.exports = mongoose.model("User", UserSchema);
