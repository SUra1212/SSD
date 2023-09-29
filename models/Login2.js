const mongoose = require("mongoose");

const Login2Schema = new mongoose.Schema({
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
  role: {
    type: String,
    required: true,
  }
});

const Login2 = mongoose.model("Login2", Login2Schema);

module.exports = Login2;
