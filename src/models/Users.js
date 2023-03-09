const mongoose = require("mongoose");

const User = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const model = mongoose.model("Users", User);

module.exports = model;
