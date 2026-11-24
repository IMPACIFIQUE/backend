const mongoose = require('mongoose');
const Daily = require('../models/DailyRecord');

async function getRemaining(product_name, ignoreId) {
  const match = { product_name };
  if (ignoreId) match._id = { $ne: new mongoose.Types.ObjectId(ignoreId) };

  const result = await Daily.aggregate([
    { $match: match },
    { $group: { _id: null,
        total: { $sum: { $cond: [{ $eq: ['$type', 'in'] }, '$quantity', { $multiply: ['$quantity', -1] }] } } } }
  ]);
  return result.length ? result[0].total : 0;
}

const createRecord = async (req, res) => {
  try {
    const { product_name, quantity, type } = req.body;
    const name = String(product_name).toLowerCase().trim();

    if (type === 'out' && quantity > await getRemaining(name)) {
      return res.status(400).json({ message: 'Not enough stock' });
    }

    const record = await Daily.create({ user: req.user._id, product_name: name, quantity, type });
    res.status(201).json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRecords = async (req, res) => {
  const records = await Daily.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(records);
};

const updateRecord = async (req, res) => {
  try {
    const record = await Daily.findOne({ _id: req.params.id, user: req.user._id });
    if (!record) return res.status(404).json({ message: 'Record not found' });

    const { product_name, quantity, type } = req.body;
    const name = product_name ? String(product_name).toLowerCase().trim() : record.product_name;
    const newType = type || record.type;
    const newQty = quantity || record.quantity;

    if (newType === 'out' && newQty > await getRemaining(name, record._id)) {
      return res.status(400).json({ message: 'Not enough stock' });
    }

    record.product_name = name;
    record.type = newType;
    record.quantity = newQty;
    await record.save();
    res.json(record);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const record = await Daily.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!record) return res.status(404).json({ message: 'Record not found' });
    res.json({ message: 'Record deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createRecord, getRecords, updateRecord, deleteRecord };  