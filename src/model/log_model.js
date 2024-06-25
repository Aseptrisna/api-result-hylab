const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
      required: true,
    },
    guid_device: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { versionKey: false }
);

const LogModel = mongoose.model("logDataCamera", LogSchema);

module.exports = LogModel;