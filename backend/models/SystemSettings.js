const mongoose = require('mongoose');

const systemSettingsSchema = new mongoose.Schema({
  adminLoginPin: {
    type: String,
    required: true,
    default: 'log1008'
  }
}, { timestamps: true });

module.exports = mongoose.model('SystemSettings', systemSettingsSchema);
