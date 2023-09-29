const mongoose = require("mongoose");

const PatientCheckinSchema = new mongoose.Schema({
  paname: {
    type: String,
    required: true,
  },
  diagnose: {
    type: String,
    required: true,
  },
  ddate: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dname: {
    type: String,
    required: true,
  },
  med1: {
    type: String,
    required: true,
  },
  med2: {
    type: String,
    required: true,
  },
  med3: {
    type: String,
    required: true,
  },
  med4: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PatientCheckin", PatientCheckinSchema);
