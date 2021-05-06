const mongoose = require("mongoose");

const booking = new mongoose.Schema({
  patient: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
    required: true,
  },
  patient_email: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const Booking = new mongoose.model("Booking", booking);

module.exports = Booking;
