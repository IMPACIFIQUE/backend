const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  username: { type: String, required: true,  lowercase: true, trim: true },
  password: { type: String, required: true, select: false },
  role:     { type: String, default: 'user' }
});

module.exports = mongoose.model('User', userSchema);