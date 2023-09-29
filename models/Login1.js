const mongoose = require("mongoose");

const Login1Schema = new mongoose.Schema({
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

const Login1 = mongoose.model("Login1", Login1Schema);

module.exports = Login1;
