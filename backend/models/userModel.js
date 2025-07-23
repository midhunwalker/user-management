// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: String,
  location: String,
  age: Number,
  gender: String,
  status: { type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
  isVerified: Boolean,
  referralStatus: { type: String, enum: ['none', 'pending', 'completed'], default: 'none' },
  walletBalance: { type: Number, default: 0 },
  completedTasks: { type: Number, default: 0 },
  joinDate: Date,
  referrals: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);