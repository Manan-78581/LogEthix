const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
  username: { type: String },
  action:   { type: String, required: true },
  meta:     { type: Object },
  timestamp:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
