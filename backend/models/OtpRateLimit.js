const mongoose = require("mongoose");

const otpRateLimitSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  requestTimestamps: {
    type: [Date],
    default: []
  }
});

module.exports = mongoose.model("OtpRateLimit", otpRateLimitSchema);
