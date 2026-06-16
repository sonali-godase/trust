const mongoose = require("mongoose");

const otpVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 86400 },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model("OTPVerification", otpVerificationSchema);
