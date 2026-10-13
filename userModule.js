const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }
});

const User = mongoose.model('User', userSchema);

async function getUsers() {
  return await User.find();
}

async function addUser(name, email) {
  const user = await User.create({ name, email });
  return user._id;
}

module.exports = { getUsers, addUser };