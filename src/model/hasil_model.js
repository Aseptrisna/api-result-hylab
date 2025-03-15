const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    guid: {
      type: String,
      required: true,
    },
    guid_device: {
      type: String,
      required: true,
    },
    image_name: {
      type: String,
      required: true,
    },
    ai_image_name: {
      type: String,
      required: true,
    },
    num_faces: {
      type: Number,
      required: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    datetime: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Aktifkan createdAt dan updatedAt
    versionKey: false,
  }
);

const Data = mongoose.model("datahasil", dataSchema);

module.exports = Data;