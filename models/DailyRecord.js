const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product_name: { type: String, required: true, lowercase: true, trim: true },
  quantity:     { type: Number, required: true, min: 1 },
  type:         { type: String, enum: ['in', 'out'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('DailyRecord', recordSchema);