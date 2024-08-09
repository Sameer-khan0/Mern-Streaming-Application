const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    youtube_api: {
      type: String,
      required: false,
    },
    facebook_api: {
      type: String,
      required: false,
    },
    twitter_api: {
      type: String,
      required: false,
    },
    password: {
      type: String,
    },
    fullName: String,
    isStreaming: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
