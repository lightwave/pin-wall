const mongoose = require('mongoose');

const PinSchema = new mongoose.Schema({
  sourceUrl: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now }
});

const Pin = mongoose.model('Pin', PinSchema);

module.exports = Pin;
