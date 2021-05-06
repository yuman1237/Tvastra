const mongoose = require("mongoose");

const files = new mongoose.Schema({
  file: { type: String },
});

const addRecord = new mongoose.Schema({
  myfile: [files],
  doctorname: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  reportType: {
    type: String,
    required: true,
  },
});

const Record = new mongoose.model("Record", addRecord);

module.exports = Record;
