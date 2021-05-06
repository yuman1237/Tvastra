const mongoose = require("mongoose");

const time = new mongoose.Schema({
  timing: { type: String },
  timeOn: { type: String },
});

const timeslots = new mongoose.Schema({
  doctorname: {
    type: String,
    required: true,
  },
  day: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  switch: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  interval: {
    type: String,
    required: true,
  },
  timeslot_arr: [time],
});

const Timeslot = new mongoose.model("timeslot", timeslots);

module.exports = Timeslot;
