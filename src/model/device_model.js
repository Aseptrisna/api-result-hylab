const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    guid: {
      required: true,
      type: String,
    },
    guid_user: {
      type: String,
      default: "",
    },
    guid_device: {
      type: String,
      default: "",
    },
    name: {
      type: String,
    },
    unit: {
      type: String,
      default: "",
    },
    type_device: {
      type: String,
      default: ["Sensor", "Aktuator"],
    },
    latitude: {
      type: String,
      default: "",
    },
    longitude: {
      type: String,
      default: "",
    },
    register: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    actived: {
      type: Boolean,
      default: true,
    },
    create_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("device", dataSchema);
