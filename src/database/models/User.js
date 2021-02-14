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
  isClicked: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  VerificationToken: {
    type: String,
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
      default: 18.516726,
    },
    Long: {
      type: Number,
      default: 73.856255,
    },
  },
  Notifications: [{ type: String }],
  otpId: String,
  active: Boolean,
  paymentAuthorize: {
    type: Number,
    default: -1,
  },
  paymentDetails: {
    accountId: String,
    entityId: String,
    amount: Number,
  },
  EndTime: {
    type: Date,
  },
});
module.exports = mongoose.model("User", UserSchema);
