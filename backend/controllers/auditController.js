const AuditLog = require("../models/AuditLog");

// Helper to log actions from within other controllers
exports.logAction = async ({ userId, role, action, details = {}, ipAddress = "" }) => {
  try {
    await AuditLog.create({
      userId,
      role,
      action,
      details,
      ipAddress
    });
  } catch (error) {
    console.error("Audit Logging Error:", error);
  }
};

// Endpoint to fetch logs
exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ timestamp: -1 }).limit(100);
    res.status(200).json({ success: true, logs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
