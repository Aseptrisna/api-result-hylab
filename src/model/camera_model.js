const mongoose = require('mongoose');

// Skema untuk model data
const dataSchema = new mongoose.Schema({
  datetime: {
    type: String,
  },
  create_at: {
    type: Date,
    default: Date.now,
  },
  timestamp: {
    type: Number,
  },
  value: {
    type: String,
  },
  guid_device: {
    type: String,
  },
  guid: {
    type: String,
  },
  unit: {
    type: String,
    default:""
  }
},
{
  versionKey: false,
});

// Membuat model "Data" dari skema "dataSchema"
const Data = mongoose.model('absensi_camp', dataSchema);

module.exports = Data;
