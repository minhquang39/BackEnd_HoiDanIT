const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  city: String,
});

const User = mongoose.model("User", userSchema);

// const silence = new kitten({ name: "hoi Quang di" });
// silence.save();

module.exports = User;
