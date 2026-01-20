const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // This will store the hashed password
  name: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  isAdmin: { type: Boolean, default: false },
  flags: { type: Number, default: 0 },
  isBanned: { type: Boolean, default: false }
});

module.exports = mongoose.model('User', UserSchema);
