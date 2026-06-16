// utils/jwtUtils.js
// Centralized JWT generation & verification utilities
// Provides three token types:
//   - Access Token (short‑lived, 15 min)    → JWT_ACCESS_SECRET
//   - Refresh Token (long‑lived, 7 days)    → JWT_REFRESH_SECRET
//   - OTP Token (stateless OTP payload)    → JWT_OTP_SECRET (10 min)

const jwt = require('jsonwebtoken');

const ACCESS_EXP = '15m';
const REFRESH_EXP = '7d';
const OTP_EXP = '10m';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
const OTP_SECRET = process.env.JWT_OTP_SECRET || process.env.JWT_SECRET;

/**
 * Generate an access token for a given user payload.
 * Payload should contain: id, email, role, name (optional).
 */
function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_SECRET, { expiresIn: ACCESS_EXP });
}

/**
 * Generate a refresh token for a given user payload.
 */
function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn: REFRESH_EXP });
}

/**
 * Generate a stateless OTP token.
 * Payload: { email, otp, role } – role used to differentiate devotee vs admin flows.
 */
function generateOtpToken(email, otp, role = 'User') {
  const payload = { email, otp, role };
  return jwt.sign(payload, OTP_SECRET, { expiresIn: OTP_EXP });
}

/** Verify an access token – returns decoded payload or throws */
function verifyAccessToken(token) {
  return jwt.verify(token, ACCESS_SECRET);
}
/** Verify a refresh token */
function verifyRefreshToken(token) {
  return jwt.verify(token, REFRESH_SECRET);
}
/** Verify an OTP token */
function verifyOtpToken(token) {
  return jwt.verify(token, OTP_SECRET);
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateOtpToken,
  verifyAccessToken,
  verifyRefreshToken,
  verifyOtpToken,
};
