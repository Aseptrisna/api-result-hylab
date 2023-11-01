const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    guid: {
      required: true,
      type: String,
    },
    guid_device: {
      type: String,
      default: "",
    },
    on: {
      type: String,
      default: "",
    },
    off: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("schedule", dataSchema);
