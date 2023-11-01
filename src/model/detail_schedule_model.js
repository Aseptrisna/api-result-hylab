const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    guid_device: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
    status: {
      type: Number,
    },
    payload: {
      type: String,
      default: "",
    },
    information: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("schedule_detail", dataSchema);