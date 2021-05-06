const mongoose = require("mongoose");

const doctorinfo = new mongoose.Schema({
  doctorname: {
    type: String,
    required: true,
  },
  describe: {
    type: String,
    required: true,
  },
  myfile: {
    type: String,
    required: true,
  },
  hospitals: {
    type: String,
    required: true,
  },
  achievement: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  awards: {
    type: String,
    required: true,
  },
  spcialization: {
    type: String,
    required: true,
  },
  avgfees: {
    type: Number,
    required: true,
  },
});

const Doctor = new mongoose.model("doctor", doctorinfo);

module.exports = Doctor;
