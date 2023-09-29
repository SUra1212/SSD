const mongoose = require("mongoose");

const AppbookingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pname: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  nicpass: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AppBooking" , AppbookingSchema);