const mongoose = require("mongoose");

const tvastraUser = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  myfile: {
    type: String,
    required: true,
  },
  doctor_hai: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  pnumber: {
    type: Number,
    required: true,
    unique: true,
  },
  timezone: {
    type: String,
  },
  homeno: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Signup = new mongoose.model("Signup", tvastraUser);

module.exports = Signup;
