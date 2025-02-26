// const mongoose = require("mongoose");

// const LogSchema = new mongoose.Schema(
//   {
//     guid: {
//       type: String,
//       required: true,
//     },
//     guid_device: {
//       type: String,
//       required: true,
//     },
//     timestamp: {
//       type: Number,
//       required: true,
//     },
//     value: {
//       type: String,
//       required: true,
//     },
//     datetime: {
//       type: String,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     status: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//   },
//   { versionKey: false }
// );

// const LogModel = mongoose.model("logDataCamera", LogSchema);

// module.exports = LogModel;

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
  }
},
{
  versionKey: false,
});

// Membuat model "Data" dari skema "dataSchema"
const Data = mongoose.model('history', dataSchema);

module.exports = Data;
