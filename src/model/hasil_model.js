const mongoose = require("mongoose");

// Skema untuk model data
const dataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    time: {
      type: Date,
      type: String,
    },
    file_name: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

// Membuat model "Data" dari skema "dataSchema"
const Data = mongoose.model("datahasil", dataSchema);

module.exports = Data;
