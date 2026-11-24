const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Daily = require('../models/DailyRecord');

const createUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const hashed = await bcrypt.hash(String(password), 10);
    const user = await User.create({ name, username, password: hashed, role: 'user' });
    res.status(201).json({ id: user._id, name: user.name, username: user.username });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find({ role: 'user' });
  res.json(users);
};

const updateUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const changes = { name, username };
    if (password) changes.password = await bcrypt.hash(String(password), 10);

    const user = await User.findOneAndUpdate(
      { _id: req.params.id, role: 'user' }, changes, { new: true }
    );
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ _id: req.params.id, role: 'user' });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getStock = async (req, res) => {
  const stock = await Daily.aggregate([
    { $group: {
        _id: '$product_name',
        total_in:  { $sum: { $cond: [{ $eq: ['$type', 'in'] },  '$quantity', 0] } },
        total_out: { $sum: { $cond: [{ $eq: ['$type', 'out'] }, '$quantity', 0] } }
    } },
    { $project: { _id: 0, product_name: '$_id', total_in: 1, total_out: 1,
                  remaining: { $subtract: ['$total_in', '$total_out'] } } }
  ]);
  res.json(stock);
};

module.exports = { createUser, getUsers, updateUser, deleteUser, getStock };