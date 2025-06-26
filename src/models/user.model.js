const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {},
  lastname: {},
  email: {},
  password: {},
  role: {},
  signupDate: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("Spend-Sense-User", userSchema);

module.exports = User;
