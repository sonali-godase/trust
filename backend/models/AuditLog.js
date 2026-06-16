const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  role: { type: String, required: true },
  action: { type: String, required: true },
  details: { type: Object, default: {} },
  ipAddress: { type: String },
  timestamp: { type: Date, default: Date.now, expires: 31536000 } // TTL index for 1 year (365 days * 24 * 60 * 60 = 31536000 seconds)
});

module.exports = mongoose.model("AuditLog", auditLogSchema);
